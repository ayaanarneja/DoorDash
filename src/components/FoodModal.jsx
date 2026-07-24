import { useEffect } from 'react';
import { FiX, FiPlus, FiMinus, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './FoodModal.css';

export default function FoodModal({ food, onClose }) {
  const { addToCart, cartMap, updateQuantity } = useCart();
  const { isFavoriteFood, toggleFavoriteFood } = useFavorites();
  
  const isFav = isFavoriteFood(food.id);
  const cartItem = cartMap[food.id];
  const quantity = cartItem ? cartItem.quantity : 0;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={food.image} alt={food.name} className="modal-image" />
            <button 
              className={`modal-favorite ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavoriteFood(food.id)}
            >
              <FiHeart className={isFav ? 'filled' : ''} />
            </button>
          </div>
          
          <div className="modal-details">
            <div className="modal-header-info">
              <div>
                <div className={`veg-indicator ${food.isVeg ? 'veg' : 'non-veg'} mb-2`}>
                  <span className="dot"></span>
                </div>
                <h2 className="modal-title">{food.name}</h2>
              </div>
              <div className="modal-rating">
                <FiStar className="star-icon" /> {food.rating}
              </div>
            </div>
            
            <p className="modal-desc">{food.description}</p>
            
            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">Calories</span>
                <span className="meta-val">{food.calories} kcal</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category</span>
                <span className="meta-val">{food.category}</span>
              </div>
            </div>
            
            <div className="modal-ingredients">
              <h3>Ingredients</h3>
              <p>{food.ingredients.join(', ')}</p>
            </div>
            
            <div className="modal-footer">
              <span className="modal-price">₹{food.price}</span>
              
              {quantity > 0 ? (
                <div className="quantity-controls lg">
                  <button className="qty-btn" onClick={() => updateQuantity(food.id, -1)}><FiMinus /></button>
                  <span className="qty-val">{quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(food.id, 1)}><FiPlus /></button>
                </div>
              ) : (
                <button className="btn-primary" onClick={() => addToCart(food)}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
