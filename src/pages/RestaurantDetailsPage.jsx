import { useParams } from 'react-router-dom';
import { FiClock, FiStar, FiHeart, FiMapPin } from 'react-icons/fi';
import FoodCard from '../components/FoodCard';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants, allFoods } from '../data/mockData';
import { useViewed } from '../context/ViewedContext';
import './RestaurantDetailsPage.css';
import { useEffect } from 'react';

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const menu = allFoods.filter(f => f.restaurantId === id);
  
  const { isFavoriteRestaurant, toggleFavoriteRestaurant } = useFavorites();
  const { viewedItems, addViewedItem } = useViewed();
  
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  if (!restaurant) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Restaurant not found</h2>
      </div>
    );
  }

  const isFav = isFavoriteRestaurant(restaurant.id);

  return (
    <div className="restaurant-details-page">
      {/* Banner */}
      <div className="restaurant-banner">
        <div className="banner-bg" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="banner-overlay"></div>
        </div>
        
        <div className="container banner-content fade-in-up">
          <div className="banner-header">
            <h1 className="banner-title">{restaurant.name}</h1>
            <button 
              className={`banner-fav-btn ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavoriteRestaurant(restaurant.id)}
            >
              <FiHeart className={isFav ? 'filled' : ''} />
            </button>
          </div>
          
          <p className="banner-cuisine">{restaurant.cuisine}</p>
          
          <div className="banner-meta">
            <div className="meta-badge rating">
              <FiStar className="icon" /> {restaurant.rating}
            </div>
            <div className="meta-badge">
              <FiClock className="icon" /> {restaurant.deliveryTime}
            </div>
            <div className="meta-badge">
              <FiMapPin className="icon" /> {restaurant.address}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container menu-section">
        <h2 className="section-title">Menu</h2>
        
        <div className="food-grid">
          {menu.map((food, index) => (
            <div 
              key={food.id} 
              className="fade-in-up" 
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => addViewedItem(food)}
            >
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed Foods */}
      {viewedItems.length > 0 && (
        <div className="container recently-viewed-section">
          <h2 className="section-title">Recently <span className="text-orange">Viewed</span></h2>
          <div className="food-grid">
            {viewedItems.slice(0, 4).map((food) => (
              <div key={`recent-${food.id}`}>
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
