import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Cover from "./Cover";
import { Tag, Package, ScanBarcode, Edit, Trash2 } from 'lucide-react';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProductId, setEditingProductId] = useState(null);
    const [newStockStatus, setNewStockStatus] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const stockStatusOptions = [
        'In Stock',
        'Out of Stock',
        'Low Stock'
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getStockStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'text-green-600 bg-green-100';
            case 'Out of Stock':
                return 'text-red-600 bg-red-100';
            case 'Low Stock':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const handleEditStatus = (productId, currentStatus) => {
        setEditingProductId(productId);
        setNewStockStatus(currentStatus);
    };

    const handleSaveStatus = async (productId) => {
        try {
            const productRef = doc(db, "products", productId);
            await updateDoc(productRef, {
                stockStatus: newStockStatus
            });

            // Update local state
            setProducts(products.map(product =>
                product.id === productId
                    ? { ...product, stockStatus: newStockStatus }
                    : product
            ));

            // Exit edit mode
            setEditingProductId(null);
        } catch (error) {
            console.error("Error updating stock status:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            // Remove from Firebase
            const productRef = doc(db, "products", productId);
            await deleteDoc(productRef);

            // Update local state
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const closeModal = () => {
        setSelectedProduct(null); // Close modal by setting selected product to null
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <>
            <Cover />
            <div className="p-4 bg-slate-100">
                <div>
                    <div className="mt-8 mb-3">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Parts Catalog</h2>
                        <p className="text-gray-600">
                            Browse our extensive collection of high-quality automotive parts
                        </p>
                    </div>
                </div>
                <div className="overflow-hidden transition-shadow rounded-lg shadow-md hover:shadow-lg">
                    {products.length ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <div key={product.id}

                                    className="flex flex-col mt-5 overflow-hidden rounded-lg shadow-md">

                                    <img
                                        src={product.imageUrl}

                                        onClick={() => setSelectedProduct(product)}
                                        alt={product.name}
                                        className="object-cover w-full h-48"
                                    />
                                    <div className="p-4"

                                    >
                                        <div className="flex items-start justify-between mb-2"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <span className="text-lg font-bold text-blue-600">${product.price}</span>
                                        </div>
                                         <div className="flex items-center gap-2 mb-2">
                                                               <ScanBarcode size={16} className="text-gray-500" />
                                                               <p className="text-sm text-gray-600 ">{product.modelNumber}</p>
                                                             </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Package size={16} className="text-gray-500" />
                                            <span className="text-sm text-gray-600">{product.manufacturer}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag size={16} className="text-gray-500" />
                                            <span className="text-sm text-gray-600">{product.category}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            {editingProductId === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={newStockStatus}
                                                        onChange={(e) => setNewStockStatus(e.target.value)}
                                                        className="px-2 py-1 border rounded"
                                                    >
                                                        {stockStatusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => handleSaveStatus(product.id)}
                                                        className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingProductId(null)}
                                                        className="px-3 py-1 text-white bg-gray-600 rounded hover:bg-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm ${getStockStatusColor(
                                                            product.stockStatus
                                                        )}`}
                                                    >
                                                        {product.stockStatus}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEditStatus(product.id, product.stockStatus)}
                                                            className="flex gap-3 text-gray-600 hover:text-blue-600"
                                                        >
                                                            <Edit size={20} />

                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(product.id);
                                                            }}
                                                            className="flex gap-3 text-red-600 hover:text-red-800"
                                                        >
                                                            <Trash2 size={20} />

                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                        <button
                            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedProduct.imageUrl}
                            alt={selectedProduct.name}
                            className="object-cover w-full h-48 mb-4 rounded-lg"
                        />
                        <h3 className="mb-2 text-2xl font-bold">{selectedProduct.name}</h3>
                        <p className="mb-4 text-sm text-gray-600">{selectedProduct.description}</p>
                        <div className="flex items-center gap-2 mb-2">
                            <ScanBarcode size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedProduct.modelNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Package size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedProduct.manufacturer}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <Tag size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedProduct.category}</span>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${getStockStatusColor(
                                selectedProduct.stockStatus
                            )}`}
                        >
                            {selectedProduct.stockStatus}
                        </span>
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DisplayProducts;
