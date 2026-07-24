import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    instructions: '',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="checkout-page container success-view">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="background"></div>
            <div className="checkmark draw"></div>
          </div>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Your delicious food is being prepared and will reach you soon.</p>
        <p className="redirect-text">Redirecting to home page...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Checkout</h1>
      
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Delivery Details</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label>Delivery Address</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Landmark</label>
                <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label>Delivery Instructions (Optional)</label>
                <textarea name="instructions" rows="2" value={formData.instructions} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                <span className="radio-custom"></span>
                Credit / Debit Card
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                <span className="radio-custom"></span>
                UPI
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="netbanking" checked={formData.paymentMethod === 'netbanking'} onChange={handleChange} />
                <span className="radio-custom"></span>
                Net Banking
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                <span className="radio-custom"></span>
                Cash on Delivery
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn-primary place-order-btn">Place Order - ₹{total}</button>
        </form>
        
        <div className="order-summary-wrapper">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="order-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="order-item-row">
                  <span className="qty">{item.quantity}x</span>
                  <span className="name">{item.name}</span>
                  <span className="price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="order-total-row">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
