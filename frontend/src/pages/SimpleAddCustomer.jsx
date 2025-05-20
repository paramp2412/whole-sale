import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SimpleAddCustomer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
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
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Customer name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
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
        setSuccessMessage('Customer added successfully!');
        
        // Reset form after success
        setFormData({
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
        
        // Redirect to customers page after 2 seconds
        setTimeout(() => {
          navigate('/customers');
        }, 2000);
      } catch (error) {
        console.error('Error adding customer:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 0', 
        borderBottom: '1px solid #e5e7eb', 
        marginBottom: '20px' 
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Wholesale Management</div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/dashboard" style={{ color: '#3b82f6', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/products" style={{ color: '#3b82f6', textDecoration: 'none' }}>Products</Link>
          <Link to="/customers" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Customers</Link>
          <Link to="/inventory" style={{ color: '#3b82f6', textDecoration: 'none' }}>Inventory</Link>
          {user && user.role === 'admin' && (
            <Link to="/staff" style={{ color: '#3b82f6', textDecoration: 'none' }}>Staff</Link>
          )}
          <button 
            onClick={handleLogout} 
            style={{ 
              color: '#3b82f6', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: 0, 
              font: 'inherit' 
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Add New Customer</h1>
          <Link 
            to="/customers" 
            style={{ 
              color: '#6b7280', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            <span>←</span> Back to Customers
          </Link>
        </div>
        
        {successMessage && (
          <div style={{ 
            backgroundColor: '#dcfce7', 
            color: '#166534', 
            padding: '12px 16px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            {successMessage}
          </div>
        )}
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '5px', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
          border: '1px solid #e5e7eb' 
        }}>
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Basic Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Customer Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.name ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.name && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.name}</p>
                )}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.email ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
                {formErrors.email && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.email}</p>
                )}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="phone" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="company" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Company
                </label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="segment" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Segment <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select 
                  id="segment" 
                  name="segment" 
                  value={formData.segment} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: formErrors.segment ? '1px solid #ef4444' : '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                >
                  <option value="">Select Segment</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="distributor">Distributor</option>
                  <option value="other">Other</option>
                </select>
                {formErrors.segment && (
                  <p style={{ color: '#ef4444', fontSize: '14px', margin: '5px 0 0 0' }}>{formErrors.segment}</p>
                )}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="industry" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Industry
                </label>
                <input 
                  type="text" 
                  id="industry" 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
            </div>
            
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginTop: '30px', marginBottom: '15px' }}>Address</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="address.street" 
                style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '5px' 
                }}
              >
                Street Address
              </label>
              <input 
                type="text" 
                id="address.street" 
                name="address.street" 
                value={formData.address.street} 
                onChange={handleChange} 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '5px', 
                  boxSizing: 'border-box' 
                }} 
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="address.city" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  City
                </label>
                <input 
                  type="text" 
                  id="address.city" 
                  name="address.city" 
                  value={formData.address.city} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="address.state" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  State/Province
                </label>
                <input 
                  type="text" 
                  id="address.state" 
                  name="address.state" 
                  value={formData.address.state} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="address.zipCode" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  ZIP/Postal Code
                </label>
                <input 
                  type="text" 
                  id="address.zipCode" 
                  name="address.zipCode" 
                  value={formData.address.zipCode} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label 
                  htmlFor="address.country" 
                  style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '5px' 
                  }}
                >
                  Country
                </label>
                <input 
                  type="text" 
                  id="address.country" 
                  name="address.country" 
                  value={formData.address.country} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '5px', 
                    boxSizing: 'border-box' 
                  }} 
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="notes" 
                style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '5px' 
                }}
              >
                Notes
              </label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                rows="4" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '5px', 
                  boxSizing: 'border-box' 
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <Link 
                to="/customers" 
                style={{ 
                  padding: '10px 16px', 
                  backgroundColor: '#f3f4f6', 
                  color: '#374151', 
                  borderRadius: '5px', 
                  textDecoration: 'none', 
                  fontWeight: '500' 
                }}
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                style={{ 
                  padding: '10px 16px', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  fontWeight: '500', 
                  opacity: isSubmitting ? 0.7 : 1 
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleAddCustomer;
