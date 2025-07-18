import { useEffect, useState } from "react";
import axios from "axios";
import "./DashProducts.css"; // Add this line
import { Link, useNavigate } from "react-router-dom";

export default function ShowProducts() {
    const [products, setProducts] = useState([]);
    const BASE_URL = "http://127.0.0.1:8000";


    const nav = useNavigate();


  // Move fetchProducts outside so we can use it after deletion too
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/product/show");
      setProducts(res.data);
      console.log(res.data);
      
      
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

console.log("Products:", products);




function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/product/delete/${id}`)
      .then(() => {
        console.log("Deleted product", id);
        // You can refetch or filter it out from the list
              fetchProducts(); // ⬅️ Call this to refresh the list
      })
      .catch(err => {
        console.error("Error deleting product:", err);
      },[]);
  
}





  return (
    <>
      <h1 className="page-title">Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>

<img
  src={
    product.images?.length > 0
      ? BASE_URL + product.images[0]
      : product.image
        ? BASE_URL + product.image
        : "/default.jpg" // fallback if no image at all
  }
  alt={product.title}
  className="product-image"
/>

            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-desc">{product.description}</p>

{product.price !== undefined && (
  <h1 className="product-price">
    {parseFloat(product.price).toFixed(2)} DA
  </h1>
)}

            <div className="icons">


            <Link to={`/dashboard/products/${product.id}`}>
                <i class="fa-solid fa-pen-to-square"></i>
            </Link>

            <Link onClick={()=> handleDelete(product.id)}>
                <i class="fa-solid fa-trash"></i>
            </Link>

            </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
