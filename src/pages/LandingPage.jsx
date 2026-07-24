import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import RestaurantCard from '../components/RestaurantCard';
import { categories, restaurants } from '../data/mockData';
import './LandingPage.css';

const categoryImages = {
  Pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
  Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  Salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
  Biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&q=80",
  Chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&q=80",
  Drinks: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80",
  Desserts: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&q=80",
  Pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80",
  "Healthy Food": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80",
  Seafood: "https://images.unsplash.com/photo-1615141982883-c7da0e698d5c?w=300&q=80",
  Italian: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&q=80",
  Mexican: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80",
  "Fast Food": "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=300&q=80",
  Indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&q=80"
};

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredRestaurants = restaurants.filter(r => r.rating >= 4.5).slice(0, 4);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Taste the Difference,<br/>
              Taste the <span className="text-orange">Good Life</span>
            </h1>
            <p className="hero-subtitle">
              Discover the best food & drinks from top restaurants around you. Fast delivery, fresh food, and great taste.
            </p>
            
            <form className="hero-search" onSubmit={handleSearch}>
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines, or food..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
          </div>
          
          <div className="hero-image-container fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-bg-shape"></div>
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" 
              alt="Healthy Food Bowl" 
              className="hero-image"
            />
            <div className="floating-card floating-1">
              <span className="floating-icon">⭐</span>
              <div>
                <h4>Top Rated</h4>
                <p>4.9/5 Average</p>
              </div>
            </div>
            <div className="floating-card floating-2">
              <span className="floating-icon">🚀</span>
              <div>
                <h4>Fast Delivery</h4>
                <p>Under 30 mins</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-section container">
        <div className="promo-banner">
          <div className="promo-content">
            <h2>Get <span className="highlight">50% OFF</span> on your first order!</h2>
            <p>Use code <strong>WELCOME50</strong> at checkout and enjoy delicious meals at half the price.</p>
            <Link to="/restaurants" className="btn-secondary promo-btn">Order Now</Link>
          </div>
          <div className="promo-image-wrapper">
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" alt="Delicious Burger" className="promo-image" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section container">
        <div className="section-header">
          <h2 className="section-title">Explore <span className="text-orange">Categories</span></h2>
        </div>
        <div className="categories-scroll">
          {categories.map((category, index) => (
            <Link to={`/restaurants?category=${category}`} key={index} className="category-item">
              <div className="category-img-wrapper">
                <img 
                  src={categoryImages[category]} 
                  alt={category} 
                  loading="lazy"
                />
              </div>
              <h3>{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="text-orange">Restaurants</span></h2>
          <Link to="/restaurants" className="view-all-link">View All <FiArrowRight /></Link>
        </div>
        
        <div className="restaurant-grid">
          {featuredRestaurants.map(restaurant => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="card-link">
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
