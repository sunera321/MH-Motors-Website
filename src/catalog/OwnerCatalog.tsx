import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Cover from "./Cover";
import { Tag, Package, ScanBarcode, Edit, Trash2, Search, AlertCircle } from 'lucide-react';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProductId, setEditingProductId] = useState(null);
    const [newStockStatus, setNewStockStatus] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteModalProduct, setDeleteModalProduct] = useState(null);

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
                return 'text-emerald-600 bg-emerald-100 border border-emerald-200';
            case 'Out of Stock':
                return 'text-rose-600 bg-rose-100 border border-rose-200';
            case 'Low Stock':
                return 'text-amber-600 bg-amber-100 border border-amber-200';
            default:
                return 'text-slate-600 bg-slate-100 border border-slate-200';
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
            setProducts(products.map(product =>
                product.id === productId
                    ? { ...product, stockStatus: newStockStatus }
                    : product
            ));
            setEditingProductId(null);
        } catch (error) {
            console.error("Error updating stock status:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            const productRef = doc(db, "products", productId);
            await deleteDoc(productRef);
            setProducts(products.filter(product => product.id !== productId));
            setDeleteModalProduct(null);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h2 className="mb-2 text-3xl font-bold text-gray-900">Parts Catalog</h2>
                        <p className="text-gray-600">
                            Manage your automotive parts inventory efficiently
                        </p>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name, category, or manufacturer..."
                            className="w-full py-3 pl-12 pr-4 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {filteredProducts.length ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
                                    <div className="relative group">
                                        <img
                                            src={product.imageUrl}
                                            onClick={() => setSelectedProduct(product)}
                                            alt={product.name}
                                            className="object-cover w-full h-48 cursor-pointer"
                                        />
                                        <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-10"></div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                                            <span className="text-lg font-bold text-blue-600">${product.price}</span>
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

                                        <div className="flex items-center justify-between">
                                            {editingProductId === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={newStockStatus}
                                                        onChange={(e) => setNewStockStatus(e.target.value)}
                                                        className="px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        {stockStatusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => handleSaveStatus(product.id)}
                                                        className="px-3 py-1.5 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingProductId(null)}
                                                        className="px-3 py-1.5 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(product.stockStatus)}`}>
                                                        {product.stockStatus}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleEditStatus(product.id, product.stockStatus)}
                                                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setDeleteModalProduct(product);
                                                            }}
                                                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                        >
                                                            <Trash2 size={18} />
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
                        <div className="py-12 text-center bg-white shadow-sm rounded-xl">
                            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-lg text-gray-600">No products found matching your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl">
                        <button
                            className="absolute p-2 text-gray-500 transition-colors duration-200 rounded-full top-4 right-4 hover:text-gray-700 hover:bg-gray-100"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>

                        <img
                            src={selectedProduct.imageUrl}
                            alt={selectedProduct.name}
                            className="object-cover w-full h-64"
                        />

                        <div className="p-6">
                            <h3 className="mb-4 text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
                            <p className="mb-6 text-gray-600">{selectedProduct.description}</p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <ScanBarcode size={18} className="text-gray-500" />
                                    <span className="text-gray-600">{selectedProduct.modelNumber}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package size={18} className="text-gray-500" />
                                    <span className="text-gray-600">{selectedProduct.manufacturer}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag size={18} className="text-gray-500" />
                                    <span className="text-gray-600">{selectedProduct.category}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStockStatusColor(selectedProduct.stockStatus)}`}>
                                    {selectedProduct.stockStatus}
                                </span>
                                <button
                                    className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {deleteModalProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Delete Product</h3>
                        <p className="mb-6 text-gray-600">
                            Are you sure you want to delete "{deleteModalProduct.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setDeleteModalProduct(null)}
                                className="px-4 py-2 text-sm text-gray-600 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteModalProduct.id)}
                                className="px-4 py-2 text-sm text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600"
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

export default DisplayProducts;