import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Sitemap = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fade-in">
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">WholesaleFlow</Link>
          <div className="navbar-links">
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-dark)' }}>
          Sitemap
        </h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Main Pages</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/" style={{ color: 'var(--primary-color)' }}>Home</Link> - Main landing page</li>
              <li><Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link> - User authentication</li>
              <li><Link to="/register" style={{ color: 'var(--primary-color)' }}>Register</Link> - New user registration</li>
              <li><Link to="/dashboard" style={{ color: 'var(--primary-color)' }}>Dashboard</Link> - User dashboard (requires login)</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Product Management</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/products" style={{ color: 'var(--primary-color)' }}>Products</Link> - View all products</li>
              <li><Link to="/products/add" style={{ color: 'var(--primary-color)' }}>Add Product</Link> - Create new product</li>
              <li><Link to="/products/low-stock" style={{ color: 'var(--primary-color)' }}>Low Stock Products</Link> - View products with low inventory</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Customer Management</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/customers" style={{ color: 'var(--primary-color)' }}>Customers</Link> - View all customers</li>
              <li><Link to="/customers/add" style={{ color: 'var(--primary-color)' }}>Add Customer</Link> - Create new customer</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Inventory Management</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/inventory" style={{ color: 'var(--primary-color)' }}>Inventory</Link> - View inventory status</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Staff Management</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/staff" style={{ color: 'var(--primary-color)' }}>Staff</Link> - Manage staff members</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Legal & Information</h2>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><Link to="/terms" style={{ color: 'var(--primary-color)' }}>Terms & Conditions</Link> - Terms of service</li>
              <li><Link to="/privacy" style={{ color: 'var(--primary-color)' }}>Privacy Policy</Link> - How we handle your data</li>
              <li><Link to="/cookies" style={{ color: 'var(--primary-color)' }}>Cookie Policy</Link> - Information about cookies</li>
              <li><Link to="/refund" style={{ color: 'var(--primary-color)' }}>Refund Policy</Link> - Our refund terms</li>
              <li><Link to="/licensing" style={{ color: 'var(--primary-color)' }}>Licensing</Link> - Software licensing information</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
