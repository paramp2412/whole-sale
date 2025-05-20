import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Licensing = () => {
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
          Licensing Information
        </h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>1. Software License</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              WholesaleFlow is licensed, not sold. This agreement only gives you some rights to use the software. 
              WholesaleFlow reserves all other rights.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Unless applicable law gives you more rights despite this limitation, you may use the software only as 
              expressly permitted in this agreement. In doing so, you must comply with any technical limitations in 
              the software that only allow you to use it in certain ways.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>2. License Types</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              WholesaleFlow offers the following license types:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><strong>Basic License:</strong> Single user, single installation. Non-transferable.</li>
              <li><strong>Professional License:</strong> Up to 5 users, multiple installations within a single organization.</li>
              <li><strong>Enterprise License:</strong> Unlimited users within a single organization.</li>
              <li><strong>Developer License:</strong> Allows for development and testing purposes only, not for production use.</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3. Restrictions</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              You may not:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Work around any technical limitations in the software</li>
              <li>Reverse engineer, decompile, or disassemble the software</li>
              <li>Remove, minimize, block, or modify any notices of WholesaleFlow or its suppliers in the software</li>
              <li>Use the software in any way that is against the law</li>
              <li>Share, publish, rent, or lease the software</li>
              <li>Transfer the software or this agreement to any third party</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>4. Third-Party Components</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The software may include third-party components with separate legal notices or governed by other agreements, 
              as may be described in the ThirdPartyNotices file accompanying the software.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Even if such components are governed by other agreements, the disclaimers and the limitations on and 
              exclusions of damages below also apply.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>5. License Term</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              This license is valid for the period specified at the time of purchase. If no period is specified, 
              the license is valid for one year from the date of purchase.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Upon expiration, you must either renew the license or cease using the software.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Licensing;
