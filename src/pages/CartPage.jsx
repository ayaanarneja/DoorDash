import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, taxes, deliveryCharges, discount, total } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container empty">
        <img src="https://illustrations.popsy.co/amber/surreal-hourglass.svg" alt="Empty Cart" className="empty-cart-img" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/restaurants" className="btn-primary mt-4">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1 className="section-title">Your <span className="text-orange">Cart</span></h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-desc">From: {item.restaurantId}</p>
                <div className="cart-item-price">₹{item.price}</div>
              </div>
              
              <div className="cart-item-actions">
                <div className="quantity-controls lg">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}><FiMinus /></button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}><FiPlus /></button>
                </div>
                
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>
                
                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-wrapper">
          <div className="cart-summary">
            <h3>Bill Details</h3>
            
            <div className="summary-row">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryCharges}</span>
            </div>
            <div className="summary-row">
              <span>Taxes and Charges</span>
              <span>₹{taxes}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>To Pay</span>
              <span>₹{total}</span>
            </div>
            
            <Link to="/checkout" className="btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
