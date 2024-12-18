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
        stockStatus: "In Stock",
        image: null,
      });
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
      setError('Something went wrong. Please try again later');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
     
     <h2 className="pt-6 text-3xl font-bold text-center">
        Add New Product
      </h2>
    <div className="max-w-4xl p-6 mx-auto mb-5 bg-white rounded-lg shadow-lg">
     
      <form onSubmit={handleSubmit} className="mb-8 space-y-6">
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Stock Status</label>
          <select
            name="stockStatus"
            value={product.stockStatus}
            onChange={handleChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Low Stock">Low Stock</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 transition duration-300 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end">
    
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            disabled={uploading}
          >
            {uploading ? (
              <span className="text-lg animate-spin">🔄</span>
            ) : (
              "Add Product"
            )}
          </button>
       
        </div>
      </form>
    
    </div>

    </>
  );
};

export default AddItemAdmin;
