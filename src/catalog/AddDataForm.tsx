import React, { useState } from "react";
import axios from "axios";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddItemAdmin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    manufacturer: "",
    category: "",
    modelNumber: "", // Corrected the typo here
    stockStatus: "In Stock",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setError(null); // Reset error when the user starts editing
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) {
      setError("Please select an image!");
      return;
    }

    try {
      setUploading(true);

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", product.image);
      formData.append("upload_preset", "default_preset"); // Replace with your upload preset
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/sunera/image/upload", // Replace `your_cloud_name`
        formData
      );

      const imageUrl = response.data.secure_url;

      // Save product details with image URL to Firestore
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: product.price,
        description: product.description,
        manufacturer: product.manufacturer,
        category: product.category,
        modelNumber: product.modelNumber, // Corrected the typo here
        stockStatus: product.stockStatus,
        imageUrl: imageUrl,
      });

      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        description: "",
        manufacturer: "",
        category: "",
        modelNumber: "", // Reset state correctly
        stockStatus: "In Stock",
        image: null,
      });
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
      setError("Something went wrong. Please try again later");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen py-10 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-xl">
          <h2 className="mb-6 text-4xl font-bold text-center text-indigo-700">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-sm text-center text-red-600">{error}</p>}

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                value={product.manufacturer}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              ><option value="-">-</option>
                <option value="Ashok Leyland">Lanka Ashok Leyland</option>
                <option value="Tata Motors">Tata Motors</option>
                <option value="Isuzu">Isuzu</option>
                <option value="Eicher">Eicher</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Hino">Hino</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Model Number
              </label>
              <input
                type="text"
                name="modelNumber"
                value={product.modelNumber} // Correctly use modelNumber here
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Stock Status
              </label>
              <select
                name="stockStatus"
                value={product.stockStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-400"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemAdmin;
