import { useState } from "react";
import './Form.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProducts(){

    const { id } = useParams(); // Get product ID from the route
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState(null);

        const nav = useNavigate();


async function Submit(e){
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);

    images.forEach((img) => {
    formData.append("images", img); // NOT images[]
    });

    console.log("Sending:", { title, description, price, images });

    const res = await axios.put(`http://127.0.0.1:8000/api/product/update/${id}`, formData);
    console.log("✅ Product Updated:", res.data);
    nav('/dashboard/products')
        

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
        <input type="file" id="images" multiple onChange={(e) => setImages(Array.from(e.target.files))} />

        <button type="submit">UpdateProduct</button>
      </form>
    </div>

    )
}