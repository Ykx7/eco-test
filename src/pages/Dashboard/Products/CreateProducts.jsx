import { useState } from "react";
import './Form.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProducts(){


   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [price, setPrice] = useState('');
   const [images, setImages] = useState([]);

      const nav = useNavigate();


async function Submit(e) {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    images.forEach((img) => {
      formData.append("images", img); // send multiple files under 'images'
    });

    console.log("Sending:", { title, description, images });

    const res = await axios.post("http://127.0.0.1:8000/api/product/create", formData);
    console.log("✅ Product created:", res.data);
    nav('/dashboard/products');

  } catch (err) {
    console.error("❌ Submit failed:", err);
  }
}




  return (

    <div className="form-container">
      <form onSubmit={Submit} className="product-form">

        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="Price">Price</label>
        <input type="number" id="price" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        
        <label htmlFor="images">Upload Images</label>
        <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />

        <button type="submit">CreateProduct</button>
      </form>
    </div>

    )
}