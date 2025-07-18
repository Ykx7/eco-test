import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import './Cart.css';
import Headers from '../../components/Header'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const BASE_URL = "http://127.0.0.1:8000";

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <>
    <Headers />
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px"
              }}
            >
              <img
                src={BASE_URL + (item.images?.[0] || item.image)}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginRight: "15px"
                }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>{parseFloat(item.price).toFixed(2)} DA</p>

                {/* Quantity Controls */}
                <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      fontSize: "18px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      fontSize: "18px",
                      cursor: "pointer",
                      marginLeft: "10px"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <h2>Total: {totalPrice.toFixed(2)} DA</h2>

          <Link to="/checkout">
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
    </>
  );
}
