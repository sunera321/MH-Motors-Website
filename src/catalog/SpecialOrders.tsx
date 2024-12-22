import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react";

const SpecialOrders = () => {
  const [specialOrders, setSpecialOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOrder, setDeleteModalOrder] = useState(null);

  const statusColors = {
    pending: "bg-yellow-500",
    review: "bg-blue-500",
    ordered: "bg-green-500"
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    review: <AlertCircle className="w-4 h-4" />,
    ordered: <CheckCircle className="w-4 h-4" />
  };

  useEffect(() => {
    fetchSpecialOrders();
  }, []);

  const fetchSpecialOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "specialOrders"));
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "pending"
      }));
      setSpecialOrders(ordersList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching special orders:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteDoc(doc(db, "specialOrders", orderId));
      setSpecialOrders(specialOrders.filter((order) => order.id !== orderId));
      setDeleteModalOrder(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "specialOrders", orderId), {
        status: newStatus
      });
      setSpecialOrders(specialOrders.map((order) => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h3 className="mb-8 text-3xl font-extrabold text-center text-gray-800">
        Special Orders
      </h3>
      
      {specialOrders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialOrders.map((order) => (
            <div
              key={order.id}
              className="relative p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {order.itemName}
                  </h4>
                  <span className="inline-block px-3 py-1 mt-2 text-sm font-medium bg-gray-100 rounded-full">
                    {order.quantity} pieces
                  </span>
                </div>
                
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="block w-32 px-4 py-2 text-sm bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="review">Review</option>
                    <option value="ordered">Ordered</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-600">{order.notes}</p>
                <div className="mt-4 space-y-2">
                  <p className="flex items-center text-sm text-gray-500">
                    <strong>Contact:</strong>
                    <a 
                      href={`tel:${order.contactNumber}`}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      {order.contactNumber}
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.date.toDate()).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between ">
              

              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 space-x-2 text-sm text-white rounded-full ${statusColors[order.status]}`}>
                  {statusIcons[order.status]}
                  <span className="capitalize">{order.status}</span>
                </span>
              </div>
              <button
                onClick={() => setDeleteModalOrder(order)}
                className="mt-3 text-red-500 transition-colors top-4 right-4 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5 " />
              </button>
            </div>
              </div>
             
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600">
            No special orders found. Check back later!
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-bold">Delete Order</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this special order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModalOrder(null)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalOrder.id)}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOrders;