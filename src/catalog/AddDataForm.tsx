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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) {
      alert("Please select an image!");
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
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="p-2 border"
          required
        ></textarea>
      </div>
      <div>
        <label>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={product.manufacturer}
          onChange={handleChange}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="p-2 border"
          required
        />
      </div>
      <div>
        <label>Stock Status:</label>
        <select
          name="stockStatus"
          value={product.stockStatus}
          onChange={handleChange}
          className="p-2 border"
          required
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddItemAdmin;
