import { Link } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../src/Context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🛍️ MyStore</Link>

        <div className="navbar-right">
          <nav className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">المنتجات</Link>
          </nav>

          {/* Cart Icon with redirect to /cart */}
          <Link to="/cart" className="cart-button">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
