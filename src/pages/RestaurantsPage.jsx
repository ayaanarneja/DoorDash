import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories, allFoods } from '../data/mockData';
import './RestaurantsPage.css';

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('rating');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    let result = [...restaurants];

    // Filter by Search Term (matches restaurant name, cuisine, or food items)
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      // Find restaurants where food matches
      const matchingFoodRestIds = new Set(
        allFoods.filter(f => f.name.toLowerCase().includes(lowerTerm)).map(f => f.restaurantId)
      );
      
      result = result.filter(r => 
        r.name.toLowerCase().includes(lowerTerm) || 
        r.cuisine.toLowerCase().includes(lowerTerm) ||
        matchingFoodRestIds.has(r.id)
      );
    }

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(r => r.cuisine.includes(activeCategory));
    }

    // Sorting implementation (O(n log n) average)
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'ratingLow') return a.rating - b.rating;
      if (sortBy === 'deliveryFast') {
        const timeA = parseInt(a.deliveryTime);
        const timeB = parseInt(b.deliveryTime);
        return timeA - timeB;
      }
      if (sortBy === 'priceLow') return a.priceLevel.length - b.priceLevel.length;
      if (sortBy === 'priceHigh') return b.priceLevel.length - a.priceLevel.length;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredRestaurants(result);
  }, [searchTerm, activeCategory, sortBy]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="restaurants-page container">
      <div className="page-header">
        <h1 className="section-title">All <span className="text-orange">Restaurants</span></h1>
        
        <div className="controls-bar">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search restaurants or food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sort-box">
            <span className="sort-label">Sort by:</span>
            <div className="select-wrapper">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="rating">Highest Rating</option>
                <option value="ratingLow">Lowest Rating</option>
                <option value="deliveryFast">Fastest Delivery</option>
                <option value="priceLow">Price (Low to High)</option>
                <option value="priceHigh">Price (High to Low)</option>
                <option value="alpha">Alphabetical</option>
              </select>
              <FiChevronDown className="select-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="categories-filter">
        <button 
          className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('All')}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="results-info">
        <p>Showing {filteredRestaurants.length} restaurants</p>
      </div>

      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">
          {filteredRestaurants.map(restaurant => (
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
        <div className="no-results">
          <img src="https://illustrations.popsy.co/amber/falling-error-404.svg" alt="No results" className="no-results-img" />
          <h2>Oops! We couldn't find what you're looking for.</h2>
          <p>Try adjusting your search or filters to find a restaurant.</p>
          <button className="btn-primary" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Clear Filters</button>
        </div>
      )}
    </div>
  );
}
