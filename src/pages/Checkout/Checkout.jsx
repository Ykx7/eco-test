import { useCart } from "../../Context/CartContext";
import { useState, useEffect } from "react";
import './Checkout.css';

export default function Checkout() {
  const { cartItems } = useCart();
  const BASE_URL = "http://127.0.0.1:8000";
  const shippingCost = 500;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    wilaya: "",
    city: "",
    address: "",
    email: "",
    notes: ""
  });

  const [rawData, setRawData] = useState([]);
  const [wilayas, setWilayas] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/AbderrahmeneDZ/Wilaya-Of-Algeria/refs/heads/master/Commune_Of_Algeria.json")
      .then(res => res.json())
      .then(data => {
        setRawData(data);

        const unique = [];
        const seen = new Set();
        data.forEach(item => {
          if (!seen.has(item.wilaya_id)) {
            seen.add(item.wilaya_id);
            unique.push({
              wilaya_id: item.wilaya_id,
              name: item.name,
              ar_name: item.ar_name
            });
          }
        });

        setWilayas(unique);
      })
      .catch(err => {
        console.error("Failed to fetch wilayas:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "wilaya") {
      const citiesOfSelected = rawData
        .filter(item => item.wilaya_id === value && item.post_code !== "01001")
        .map(item => item.name);

      setCities([...new Set(citiesOfSelected)]);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0) + shippingCost;

  const handleSubmit = async () => {
    const orderData = {
      user_name: `${form.firstName} ${form.lastName}`.trim(),
      user_address: `${form.address}, ${form.city}, ${form.wilaya}`,
      phone: form.phone,
      email: form.email,
      notes: form.notes,
      cartItems: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const res = await fetch("http://localhost:8000/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Order placed successfully!");
        console.log(data);
      } else {
        alert("❌ Error placing order");
        console.error(data);
      }
    } catch (err) {
      console.error("❌ Failed to send order", err);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Billing & Shipping</h2>

        <div className="form-row">
          <input name="firstName" placeholder="First name (optional)" onChange={handleChange} />
          <input name="lastName" placeholder="Last name (optional)" onChange={handleChange} />
        </div>

        <input name="phone" placeholder="Phone *" required onChange={handleChange} />
        <input disabled value="Algeria" />

        <select name="wilaya" required onChange={handleChange} value={form.wilaya}>
          <option value="">Select Wilaya *</option>
          {wilayas.map(w => (
            <option key={w.wilaya_id} value={w.wilaya_id}>
              {w.wilaya_id} - {w.name} - {w.ar_name}
            </option>
          ))}
        </select>

        <select name="city" required onChange={handleChange} value={form.city}>
          <option value="">Select City *</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>

        <input name="address" placeholder="Street address (optional)" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email address (optional)" onChange={handleChange} />
        <textarea name="notes" placeholder="Order notes (optional)" onChange={handleChange} />
      </div>

      <div className="checkout-summary">
        <h2>Your Order</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <img src={BASE_URL + (item.images?.[0] || item.image)} alt={item.title} />
            <div><strong>{item.title}</strong> × {item.quantity}</div>
            <div>{(parseFloat(item.price) * item.quantity).toFixed(2)} د.ج</div>
          </div>
        ))}

        <div className="checkout-totals">
          <div>Subtotal: {cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)} د.ج</div>
          <div>Shipping: {shippingCost.toFixed(2)} د.ج</div>
          <div><strong>Total: {total.toFixed(2)} د.ج</strong></div>
        </div>

        <p>Pay in Person</p>
        <button onClick={handleSubmit} className="checkout-button">PLACE ORDER</button>
      </div>
    </div>
  );
}
