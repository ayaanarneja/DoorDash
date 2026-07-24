import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants, allFoods } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('restaurants');

  const favoriteRestaurants = restaurants.filter(r => favorites.restaurants.includes(r.id));
  const favoriteFoods = allFoods.filter(f => favorites.foods.includes(f.id));

  return (
    <div className="favorites-page container">
      <h1 className="section-title">Your <span className="text-orange">Favorites</span></h1>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurants ({favoriteRestaurants.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'foods' ? 'active' : ''}`}
          onClick={() => setActiveTab('foods')}
        >
          Food Items ({favoriteFoods.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'restaurants' && (
          favoriteRestaurants.length > 0 ? (
            <div className="restaurant-grid">
              {favoriteRestaurants.map(restaurant => (
                <div key={restaurant.id} className="fade-in-up">
                  <a href={`/restaurant/${restaurant.id}`} className="card-link" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/restaurant/${restaurant.id}`;
                  }}>
                    <RestaurantCard restaurant={restaurant} />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img src="https://illustrations.popsy.co/amber/student-going-to-school.svg" alt="Empty Favorites" />
              <h3>No Favorite Restaurants Yet</h3>
              <p>Explore restaurants and tap the heart icon to save them here.</p>
            </div>
          )
        )}

        {activeTab === 'foods' && (
          favoriteFoods.length > 0 ? (
            <div className="food-grid">
              {favoriteFoods.map(food => (
                <div key={food.id} className="fade-in-up">
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img src="https://illustrations.popsy.co/amber/key-to-success.svg" alt="Empty Favorites" />
              <h3>No Favorite Foods Yet</h3>
              <p>Find your favorite meals and save them for quick access later.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
