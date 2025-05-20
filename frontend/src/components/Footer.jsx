import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">WholesaleFlow</h3>
              <p className="footer-description">
                Streamline your wholesale operations with our all-in-one management platform.
                We provide comprehensive solutions for inventory management, customer tracking,
                and staff performance monitoring.
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
                <li><Link to="/login" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Login</Link></li>
                <li><Link to="/register" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Register</Link></li>
                <li><Link to="/dashboard" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Dashboard</Link></li>
                <li><Link to="/products" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Products</Link></li>
                <li><Link to="/customers" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Customers</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-links">
                <li><Link to="/terms" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
                <li><Link to="/cookies" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</Link></li>
                <li><Link to="/refund" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Refund Policy</Link></li>
                <li><Link to="/licensing" className="footer-link" onClick={() => window.scrollTo(0, 0)}>Licensing</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <address className="footer-contact">
                <p><i className="fas fa-map-marker-alt">📍</i> 123 Business Avenue, Suite 500<br />New York, NY 10001</p>
                <p><i className="fas fa-phone">📞</i> <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a></p>
                <p><i className="fas fa-envelope">✉️</i> <a href="mailto:info@wholesaleflow.com" className="footer-link">info@wholesaleflow.com</a></p>
                <p><i className="fas fa-clock">🕒</i> Monday - Friday: 9:00 AM - 5:00 PM</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} WholesaleFlow. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-bottom-link" onClick={() => window.scrollTo(0, 0)}>Terms</Link>
            <Link to="/privacy" className="footer-bottom-link" onClick={() => window.scrollTo(0, 0)}>Privacy</Link>
            <Link to="/sitemap" className="footer-bottom-link" onClick={() => window.scrollTo(0, 0)}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
