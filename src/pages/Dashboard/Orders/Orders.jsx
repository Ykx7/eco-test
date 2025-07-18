import { useEffect, useState } from "react";

export function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch("http://localhost:8000/api/order/show")
      .then(res => res.json())
      .then(data => {
        const pendingOrders = data.filter(order => order.status === "pending");
        setOrders(pendingOrders);
      })
      .catch(err => console.error("Failed to load orders", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8000/api/order/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setOrders(prev => prev.filter(order => order.id !== id)); // remove after status change
      }
    } catch (err) {
      console.error("❌ Failed to update order", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📦 Pending Orders</h1>

      {orders.length === 0 ? (
        <p>No pending orders.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem"
          }}>
            <h3>🆔 Order ID: {order.id}</h3>
            <p>👤 <strong>Name:</strong> {order.user_name}</p>
            <p>📞 <strong>Phone:</strong> {order.phone || "-"}</p>
            <p>📧 <strong>Email:</strong> {order.email || "-"}</p>
            <p>📍 <strong>Address:</strong> {order.user_address}</p>
            <p>📝 <strong>Notes:</strong> {order.notes || "No notes"}</p>
            <p>📅 <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p>🚚 <strong>Status:</strong> {order.status}</p>

            <h4>🛒 Items:</h4>
<ul>
  {order.cartItems?.map((item, idx) => (
    <li key={idx}>
      {item.id} / {item.title} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} DA
    </li>
  ))}
</ul>

<p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
  💵 Total: {
    order.cartItems
      ?.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0)
      .toFixed(2)
  } DA
</p>

            <div style={{ marginTop: "1rem" }}>
              <button
                style={{ marginRight: "1rem", background: "#4CAF50", color: "#fff", padding: "0.5rem" }}
                onClick={() => updateStatus(order.id, "accepted")}
              >
                ✅ Accept
              </button>
              <button
                style={{ background: "#f44336", color: "#fff", padding: "0.5rem" }}
                onClick={() => updateStatus(order.id, "refused")}
              >
                ❌ Refuse
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}





// AcceptedOrders.jsx

export function AcceptedOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/order/show")
      .then(res => res.json())
      .then(data => {
        const accepted = data.filter(order => order.status === "accepted");
        setOrders(accepted);
      })
      .catch(err => console.error("Failed to load accepted orders", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✅ Accepted Orders</h1>
      {orders.length === 0 ? (
        <p>No accepted orders.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>🆔 Order ID: {order.id}</h3>
            <p><strong>Name:</strong> {order.user_name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Number:</strong> {order.phone}</p>

            {/* Add more details if you want */}
          </div>
        ))
      )}
    </div>
  );
}




// RefusedOrders.jsx

export function RefusedOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/order/show")
      .then(res => res.json())
      .then(data => {
        const refused = data.filter(order => order.status === "refused");
        setOrders(refused);
      })
      .catch(err => console.error("Failed to load refused orders", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❌ Refused Orders</h1>
      {orders.length === 0 ? (
        <p>No refused orders.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>🆔 Order ID: {order.id}</h3>
            <p><strong>Name:</strong> {order.user_name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            {/* Add more details if you want */}
          </div>
        ))
      )}
    </div>
  );
}
