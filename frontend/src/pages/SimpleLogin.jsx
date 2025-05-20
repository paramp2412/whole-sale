import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleLogin = () => {
  const { login, isAuthenticated, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear field error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const success = await login(formData);

      setIsSubmitting(false);

      if (success) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-sidebar">
        <h1>WholesaleFlow</h1>
        <p>Streamline your wholesale operations with our all-in-one management platform.</p>

        <div>
          <div className="login-feature">
            <div className="login-feature-icon">✓</div>
            <span>Customer Segmentation</span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">✓</div>
            <span>Staff Performance Tracking</span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">✓</div>
            <span>Inventory Management</span>
          </div>

          <div className="login-feature">
            <div className="login-feature-icon">✓</div>
            <span>Role-Based Access Control</span>
          </div>
        </div>
      </div>

      <div className="login-form">
        <div className="login-card">
          <h2>Welcome to WholesaleFlow</h2>
          <p>Sign in to your account to continue</p>

          {error && (
            <div className="alert alert-danger mb-4">
              <span>{error}</span>
              <button
                onClick={clearError}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com or staff@example.com"
                required
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--primary-color)', textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="admin or staff"
                required
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="login-btn"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center mt-3">
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
