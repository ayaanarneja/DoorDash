import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="text-orange">Door</span>Dash
            </Link>
            <p className="footer-desc">
              Experience the best food delivery service in town. We bring your favorite meals straight to your doorstep, hot and fresh!
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><FiFacebook /></a>
              <a href="#" className="social-icon"><FiTwitter /></a>
              <a href="#" className="social-icon"><FiInstagram /></a>
              <a href="#" className="social-icon"><FiYoutube /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Delivery</Link></li>
              <li><Link to="/returns">Returns Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <FiMapPin className="contact-icon" />
              <span>123 Food Street, Culinary District, 45678</span>
            </div>
            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <span>+1 (234) 567-8900</span>
            </div>
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <span>support@doordash.com</span>
            </div>
            
            <div className="newsletter">
              <h4>Subscribe to our Newsletter</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email Address" required />
                <button type="submit" className="btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DoorDash. All rights reserved.</p>
      </div>
    </footer>
  );
}
