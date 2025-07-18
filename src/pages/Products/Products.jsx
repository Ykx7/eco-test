import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import "./Products.css";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const BASE_URL = "http://127.0.0.1:8000";
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/product/show");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="products-page">
        <h1 className="products-title">🛍️ Our Products</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="no-products">❌ No products found.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div
                  className="product-image-wrapper"
                  onClick={() => nav(`/products/${product.id}`)}
                >
                  <img
                    src={
                      product.images?.length > 0
                        ? BASE_URL + product.images[0]
                        : product.image
                        ? BASE_URL + product.image
                        : "/default.jpg"
                    }
                    alt={product.title}
                    className="product-image"
                  />
                </div>

                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">
                    {parseFloat(product.price).toFixed(2)} DA
                  </p>
                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
