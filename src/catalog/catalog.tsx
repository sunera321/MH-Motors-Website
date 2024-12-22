import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import Cover from "./Cover";
import { Tag, Package, ScanBarcode, Search, Star, ShoppingCart, X, MessageCircle } from "lucide-react";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showSpecialOrderForm, setShowSpecialOrderForm] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [searchQuery, setSearchQuery] = useState("");
  const [specialOrder, setSpecialOrder] = useState({
    itemName: "",
    quantity: "",
    notes: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setFilteredProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [priceRange, products, searchQuery]);

  const fetchReviews = async (productId) => {
    try {
      const reviewsRef = collection(db, "products", productId, "reviews");
      const querySnapshot = await getDocs(reviewsRef);
      const reviewsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsList);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddReview = async (productId) => {
    if (newReview.trim() === "") return;
    try {
      const reviewsRef = collection(db, "products", productId, "reviews");
      await addDoc(reviewsRef, { text: newReview, date: new Date() });
      setNewReview("");
      fetchReviews(productId);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  
  const handleSpecialOrderChange = (e) => {
    const { name, value } = e.target;
    setSpecialOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialOrder = async () => {
    try {
      const specialOrdersRef = collection(db, "specialOrders");
      await addDoc(specialOrdersRef, {
        ...specialOrder,
        date: new Date(), // Add a timestamp
      });
      alert("Special order submitted successfully!");
      setSpecialOrder({ itemName: "", quantity: "", notes: "" }); // Reset the form
      setShowSpecialOrderForm(false);
    } catch (error) {
      console.error("Error submitting special order:", error);
      alert("Failed to submit the special order.");
    }
  };
  

  const getStockStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "text-emerald-600 bg-emerald-100 border border-emerald-200";
      case "Out of Stock":
        return "text-rose-600 bg-rose-100 border border-rose-200";
      case "Low Stock":
        return "text-amber-600 bg-amber-100 border border-amber-200";
      default:
        return "text-slate-600 bg-slate-100 border border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Cover />
      <div className="px-6 py-8">
       
        <div className="flex justify-between">
          <div className="flex mb-8 space-y-10">
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
              <input
          type="text"
          placeholder="Search amazing products..."
          className="py-2 pl-12 pr-4 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[400%]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <button
            className="flex items-center h-10 gap-2 px-3 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => setShowSpecialOrderForm(true)}
          >
            <Tag size={18} />
            Special Order
          </button>
        </div>
        {/* Products Grid */}
        {filteredProducts.length ? (
          <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden transition-shadow transition-transform duration-200 duration-300 transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-1"
                onClick={() => {
                  setSelectedProduct(product);
                  fetchReviews(product.id);
                }}
              >
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(product.stockStatus)}`}>
                      {product.stockStatus}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                    <span className="text-xl font-bold text-blue-600">Rs.{product.price}</span>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ScanBarcode size={16} />
                      <span className="text-sm">{product.modelNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package size={16} />
                      <span className="text-sm">{product.manufacturer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Tag size={16} />
                      <span className="text-sm">{product.category}</span>
                    </div>
                  </div>

                  <button
                    className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => window.open("https://wa.me/94788270611", "_blank")}
                  >
                    <ShoppingCart size={18} />
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 mx-auto text-center max-w-7xl">
            <p className="text-lg text-gray-600">No products available with the current filters.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl">
            <button
              className="absolute p-2 transition-colors duration-200 bg-gray-100 rounded-full top-4 right-4 hover:bg-gray-200"
              onClick={() => {
                setSelectedProduct(null);
                setShowReviews(false);
                setReviews([]);
              }}
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="max-h-[80vh] overflow-y-auto">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="object-cover w-full h-64"
              />

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                <p className="mb-6 text-gray-600">{selectedProduct.description}</p>

                {showReviews ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-800">Customer Reviews</h4>
                      <button
                        className="font-medium text-blue-600 hover:text-blue-700"
                        onClick={() => setShowReviews(false)}
                      >
                        Back to Details
                      </button>
                    </div>

                    <div className="space-y-3">
                      {reviews.length ? (
                        reviews.map((review) => (
                          <div key={review.id} className="p-4 rounded-lg bg-gray-50">
                            <p className="text-gray-700">{review.text}</p>
                            <p className="mt-2 text-sm text-gray-500">
                              {new Date(review.date.toDate()).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No reviews available yet. Be the first to review!</p>
                      )}
                    </div>

                    <div className="mt-6">
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your review here..."
                        rows={4}
                      />
                      <button
                        className="px-6 py-2 mt-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={() => handleAddReview(selectedProduct.id)}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="flex items-center gap-2 px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => setShowReviews(true)}
                  >
                    <MessageCircle size={18} />
                    View Reviews
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSpecialOrderForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              className="absolute p-2 bg-gray-100 rounded-full top-4 right-4 hover:bg-gray-200"
              onClick={() => setShowSpecialOrderForm(false)}
            >
              <X size={20} className="text-gray-600" />
            </button>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Place a Special Order
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSpecialOrder();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={specialOrder.itemName}
                  onChange={handleSpecialOrderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the item name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={specialOrder.quantity}
                  onChange={handleSpecialOrderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={specialOrder.notes}
                  onChange={handleSpecialOrderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Any specific requirements..."
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={specialOrder.contactNumber}
                  onChange={handleSpecialOrderChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your contact number"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Submit Special Order
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DisplayProducts;