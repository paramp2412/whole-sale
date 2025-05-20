import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsConditions = () => {
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
          Terms and Conditions
        </h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>1. Introduction</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Welcome to WholesaleFlow. These Terms and Conditions govern your use of our website and services.
              By accessing or using WholesaleFlow, you agree to be bound by these Terms. If you disagree with any
              part of the terms, you may not access the service.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>2. Use License</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Permission is granted to temporarily use WholesaleFlow for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on WholesaleFlow;</li>
              <li>Remove any copyright or other proprietary notations from the materials;</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated
              by WholesaleFlow at any time.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3. Disclaimer</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The materials on WholesaleFlow are provided on an 'as is' basis. WholesaleFlow makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Further, WholesaleFlow does not warrant or make any representations concerning the accuracy, likely results,
              or reliability of the use of the materials on its website or otherwise relating to such materials or on any
              sites linked to this site.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>4. Limitations</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In no event shall WholesaleFlow or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
              use the materials on WholesaleFlow, even if WholesaleFlow or a WholesaleFlow authorized representative has
              been notified orally or in writing of the possibility of such damage.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>5. Revisions and Errata</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The materials appearing on WholesaleFlow could include technical, typographical, or photographic errors.
              WholesaleFlow does not warrant that any of the materials on its website are accurate, complete or current.
              WholesaleFlow may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
