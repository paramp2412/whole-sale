import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleRegister = () => {
  const { register, isAuthenticated, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;

      const success = await register(registerData);

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
          <h2>Create an Account</h2>
          <p>Sign up to get started with WholesaleFlow</p>

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
              <label htmlFor="name" className="form-label">
                Name <span style={{ color: 'var(--danger-color)' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
              />
              {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email <span style={{ color: 'var(--danger-color)' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span style={{ color: 'var(--danger-color)' }}>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span style={{ color: 'var(--danger-color)' }}>*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
              />
              {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="login-btn"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center mt-3">
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegister;
