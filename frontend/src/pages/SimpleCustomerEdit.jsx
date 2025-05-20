import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleCustomerEdit = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    industry: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    notes: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // In a real application, you would fetch the customer data from your API
    // For now, we'll simulate fetching data
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock customer data based on ID
        if (id === '1') {
          setFormData({
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            company: 'ABC Retail',
            segment: 'Retail',
            industry: 'Consumer Goods',
            address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            },
            notes: 'Prefers email communication. Interested in bulk discounts.'
          });
        } else if (id === '2') {
          setFormData({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '+1 (555) 987-6543',
            company: 'XYZ Distributors',
            segment: 'Distributor',
            industry: 'Wholesale',
            address: {
              street: '456 Market Ave',
              city: 'Chicago',
              state: 'IL',
              zipCode: '60601',
              country: 'USA'
            },
            notes: 'Key account. Monthly ordering schedule.'
          });
        } else {
          // If customer not found, navigate back to customers page
          navigate('/customers');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'Company is required';
    }
    
    if (!formData.segment) {
      errors.segment = 'Segment is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real application, you would send this data to your API
        // For now, we'll simulate a successful API call
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        setSuccessMessage('Customer updated successfully!');
        
        // Redirect to customers page after 2 seconds
        setTimeout(() => {
          navigate('/customers');
        }, 2000);
      } catch (error) {
        console.error('Error updating customer:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="fade-in">
        <header className="header">
          <div className="container header-container">
            <Link to="/" className="brand">WholesaleFlow</Link>
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/products" className="nav-link">Products</Link>
              <Link to="/customers" className="nav-link active">Customers</Link>
              <Link to="/inventory" className="nav-link">Inventory</Link>
              <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="brand">WholesaleFlow</Link>
          <nav className="nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/customers" className="nav-link active">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Customer</h1>
          <Link to="/customers" className="btn btn-secondary">
            Back to Customers
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={`form-control ${formErrors.company ? 'is-invalid' : ''}`}
                    value={formData.company}
                    onChange={handleChange}
                  />
                  {formErrors.company && <div className="invalid-feedback">{formErrors.company}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="segment" className="form-label">Segment</label>
                  <select
                    id="segment"
                    name="segment"
                    className={`form-control ${formErrors.segment ? 'is-invalid' : ''}`}
                    value={formData.segment}
                    onChange={handleChange}
                  >
                    <option value="">Select Segment</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.segment && <div className="invalid-feedback">{formErrors.segment}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="industry" className="form-label">Industry</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    className="form-control"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h3 className="form-section-title">Address</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address.street" className="form-label">Street</label>
                  <input
                    type="text"
                    id="address.street"
                    name="address.street"
                    className="form-control"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address.city" className="form-label">City</label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    className="form-control"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.state" className="form-label">State/Province</label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    className="form-control"
                    value={formData.address.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address.zipCode" className="form-label">Zip/Postal Code</label>
                  <input
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    className="form-control"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address.country" className="form-label">Country</label>
                  <input
                    type="text"
                    id="address.country"
                    name="address.country"
                    className="form-control"
                    value={formData.address.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <Link to="/customers" className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCustomerEdit;
