import { Link } from 'react-router-dom';
import { FiClock, FiStar, FiHeart } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant }) {
  const { isFavoriteRestaurant, toggleFavoriteRestaurant } = useFavorites();
  const isFav = isFavoriteRestaurant(restaurant.id);

  return (
    <div className="restaurant-card">
      <div className="restaurant-image-wrapper">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" loading="lazy" />
        <button 
          className={`favorite-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavoriteRestaurant(restaurant.id);
          }}
          aria-label="Toggle Favorite"
        >
          <FiHeart className={isFav ? 'filled' : ''} />
        </button>
        {restaurant.discount && <span className="discount-badge">{restaurant.discount}</span>}
        {!restaurant.isOpen && <div className="closed-overlay">Closed</div>}
      </div>
      
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <span className="restaurant-rating">
            <FiStar className="star-icon" /> {restaurant.rating}
          </span>
        </div>
        
        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
        
        <div className="restaurant-footer">
          <span className="delivery-time"><FiClock /> {restaurant.deliveryTime}</span>
          <span className="price-level">{restaurant.priceLevel}</span>
        </div>
      </div>
    </div>
  );
}
