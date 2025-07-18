import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Card.css";
import Navbar from "../../components/Header";
import { useCart } from "../../Context/CartContext";

export default function CardProduct() {
  const { addToCart } = useCart(); // ✅ make sure CartProvider wraps your app
  const BASE_URL = "http://127.0.0.1:8000";

  const { id } = useParams();
  const [viewCard, setViewCard] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/product/show/${id}`);
        setViewCard(res.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchData();
  }, [id]);

  const images = viewCard.images || (viewCard.image ? [viewCard.image] : []);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (!viewCard.id) return;
    addToCart({
      id: viewCard.id,
      title: viewCard.title,
      image: viewCard.images?.[0] || viewCard.image || "/default.jpg",
      price: viewCard.price,
    });
    console.log("✅ Added to cart:", viewCard.title);
  };

  return (
    <>
      <Navbar />

      <div className="product-view-container">
        <div className="product-left">
          <div className="image-slider">
            <button className="arrow left" onClick={handlePrev}>
              &lt;
            </button>

            <img
              src={BASE_URL + images[currentImageIndex]}
              alt=""
              className="product-main-image"
            />

            <button className="arrow right" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>

        <div className="product-right">
          <p className="product-label">pc gamer</p>
          <h1 className="product-title">{viewCard.title}</h1>
          <p className="product-description">{viewCard.description}</p>

          {viewCard.price !== undefined && (
            <h1 className="current-price">
              {parseFloat(viewCard.price).toFixed(2)} DA
            </h1>
          )}

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
