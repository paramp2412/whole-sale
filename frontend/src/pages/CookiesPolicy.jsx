import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CookiesPolicy = () => {
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
          Cookie Policy
        </h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>1. What Are Cookies</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Cookies allow us to recognize your device and provide you with a personalized experience on our website. 
              They are not harmful and do not contain any personal information that could identify you personally.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>2. How We Use Cookies</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              WholesaleFlow uses cookies for a variety of purposes, including:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><strong>Essential cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><strong>Performance cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><strong>Functionality cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
              <li><strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3. Managing Cookies</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, 
              or to alert you when cookies are being sent. The Help function within your browser should tell you how.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Please note that if you disable or refuse cookies, some parts of the website may not function properly.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>4. Third-Party Cookies</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, 
              deliver advertisements on and through the service, and so on.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>5. Updates to This Cookie Policy</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
