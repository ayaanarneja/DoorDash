import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="text-orange">Door</span>Dash
        </Link>
        
        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/restaurants">Restaurants</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/favorites">Favorites</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        <div className="navbar-icons">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <Link to="/restaurants" className="icon-btn" aria-label="Search"><FiSearch /></Link>
          <Link to="/favorites" className="icon-btn" aria-label="Favorites"><FiHeart /></Link>
          <Link to="/cart" className="icon-btn cart-icon" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/auth" className="icon-btn" aria-label="Profile"><FiUser /></Link>
        </div>
      </div>
    </nav>
  );
}
