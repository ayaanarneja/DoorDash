import { useState } from 'react';
import { FiPlus, FiMinus, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import FoodModal from './FoodModal';
import './FoodCard.css';

export default function FoodCard({ food }) {
  const { addToCart, cartMap, updateQuantity } = useCart();
  const { isFavoriteFood, toggleFavoriteFood } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isFav = isFavoriteFood(food.id);
  const cartItem = cartMap[food.id];
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(food);
  };

  const handleUpdateQuantity = (e, delta) => {
    e.stopPropagation();
    updateQuantity(food.id, delta);
  };

  return (
    <>
      <div className="food-card" onClick={() => setIsModalOpen(true)}>
        <div className="food-image-wrapper">
          <img src={food.image} alt={food.name} className="food-image" loading="lazy" />
          <button 
            className={`favorite-btn ${isFav ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteFood(food.id);
            }}
            aria-label="Toggle Favorite"
          >
            <FiHeart className={isFav ? 'filled' : ''} />
          </button>
          <div className={`veg-indicator ${food.isVeg ? 'veg' : 'non-veg'}`}>
            <span className="dot"></span>
          </div>
        </div>
        
        <div className="food-info">
          <div className="food-header">
            <h3 className="food-name">{food.name}</h3>
            <span className="food-rating"><FiStar className="star-icon" /> {food.rating}</span>
          </div>
          
          <p className="food-desc">{food.description.substring(0, 50)}...</p>
          
          <div className="food-footer">
            <span className="food-price">₹{food.price}</span>
            
            {quantity > 0 ? (
              <div className="quantity-controls" onClick={(e) => e.stopPropagation()}>
                <button className="qty-btn" onClick={(e) => handleUpdateQuantity(e, -1)}><FiMinus /></button>
                <span className="qty-val">{quantity}</span>
                <button className="qty-btn" onClick={(e) => handleUpdateQuantity(e, 1)}><FiPlus /></button>
              </div>
            ) : (
              <button className="add-cart-btn" onClick={handleAddToCart}>
                ADD
              </button>
            )}
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <FoodModal food={food} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
