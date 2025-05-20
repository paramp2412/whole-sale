import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const RefundPolicy = () => {
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
          Refund Policy
        </h1>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>1. Refund Eligibility</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              At WholesaleFlow, we strive to ensure complete satisfaction with our services. We offer refunds under the following conditions:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Service was not provided as described</li>
              <li>Technical issues prevented access to the service</li>
              <li>Duplicate charges or billing errors</li>
              <li>Cancellation within 14 days of initial subscription (for new customers only)</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>2. Refund Process</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              To request a refund, please contact our customer support team at refunds@wholesaleflow.com with the following information:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Your account email address</li>
              <li>Date of purchase</li>
              <li>Reason for refund request</li>
              <li>Any relevant order numbers or transaction IDs</li>
            </ul>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              We will review your request and respond within 3 business days. If approved, refunds will be processed to the original payment method within 5-10 business days.
            </p>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3. Non-Refundable Items</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The following are not eligible for refunds:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Subscriptions active for more than 14 days</li>
              <li>Custom development or implementation services that have been delivered</li>
              <li>Data migration services that have been completed</li>
              <li>Training sessions that have been conducted</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>4. Partial Refunds</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In some cases, we may issue partial refunds at our discretion. This typically applies when:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Only part of the service was unsatisfactory</li>
              <li>The service was used for a significant portion of the billing period</li>
              <li>Custom work was partially completed</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>5. Changes to This Policy</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              If you have any questions about our refund policy, please contact our customer support team at support@wholesaleflow.com.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
