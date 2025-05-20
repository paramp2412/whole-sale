import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleInventoryEdit = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    quantity: '',
    transactionType: 'adjustment',
    transactionQuantity: '',
    transactionReason: '',
    location: {
      warehouse: '',
      section: '',
      shelf: ''
    }
  });
  
  const [productInfo, setProductInfo] = useState({
    name: '',
    sku: '',
    category: '',
    currentQuantity: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // In a real application, you would fetch the inventory data from your API
    // For now, we'll simulate fetching data
    const fetchInventory = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock inventory data based on ID
        if (id === '1') {
          setProductInfo({
            name: 'Sample Product 1',
            sku: 'SKU-001',
            category: 'Massager',
            currentQuantity: 25
          });
          
          setFormData({
            quantity: '25',
            transactionType: 'adjustment',
            transactionQuantity: '',
            transactionReason: '',
            location: {
              warehouse: 'Main Warehouse',
              section: 'A',
              shelf: '3'
            }
          });
        } else if (id === '2') {
          setProductInfo({
            name: 'Sample Product 2',
            sku: 'SKU-002',
            category: 'Toys',
            currentQuantity: 3
          });
          
          setFormData({
            quantity: '3',
            transactionType: 'adjustment',
            transactionQuantity: '',
            transactionReason: '',
            location: {
              warehouse: 'Main Warehouse',
              section: 'B',
              shelf: '1'
            }
          });
        } else {
          // If inventory not found, navigate back to inventory page
          navigate('/inventory');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
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
    
    if (formData.transactionType !== 'adjustment') {
      if (!formData.transactionQuantity.trim()) {
        errors.transactionQuantity = 'Transaction quantity is required';
      } else if (isNaN(parseInt(formData.transactionQuantity)) || parseInt(formData.transactionQuantity) <= 0) {
        errors.transactionQuantity = 'Transaction quantity must be a positive number';
      }
      
      if (!formData.transactionReason.trim()) {
        errors.transactionReason = 'Reason is required';
      }
    } else {
      if (!formData.quantity.trim()) {
        errors.quantity = 'New quantity is required';
      } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
        errors.quantity = 'Quantity must be a non-negative number';
      }
    }
    
    if (!formData.location.warehouse.trim()) {
      errors['location.warehouse'] = 'Warehouse is required';
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
        setSuccessMessage('Inventory updated successfully!');
        
        // Redirect to inventory page after 2 seconds
        setTimeout(() => {
          navigate('/inventory');
        }, 2000);
      } catch (error) {
        console.error('Error updating inventory:', error);
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
              <Link to="/customers" className="nav-link">Customers</Link>
              <Link to="/inventory" className="nav-link active">Inventory</Link>
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
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link active">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Update Inventory</h1>
          <Link to="/inventory" className="btn btn-secondary">
            Back to Inventory
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <div className="card mb-4">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{productInfo.name}</h2>
              <span className={`badge ${productInfo.currentQuantity <= 5 ? 'badge-warning' : 'badge-success'}`}>
                {productInfo.currentQuantity <= 5 ? 'Low Stock' : 'In Stock'}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-sku">SKU: {productInfo.sku}</div>
              <div className="product-sku">Category: {productInfo.category}</div>
              <div className="product-sku">Current Quantity: {productInfo.currentQuantity}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                <select
                  id="transactionType"
                  name="transactionType"
                  className="form-control"
                  value={formData.transactionType}
                  onChange={handleChange}
                >
                  <option value="adjustment">Direct Adjustment</option>
                  <option value="in">Stock In</option>
                  <option value="out">Stock Out</option>
                </select>
              </div>

              {formData.transactionType === 'adjustment' ? (
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">New Quantity</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    className={`form-control ${formErrors.quantity ? 'is-invalid' : ''}`}
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                  {formErrors.quantity && <div className="invalid-feedback">{formErrors.quantity}</div>}
                </div>
              ) : (
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label htmlFor="transactionQuantity" className="form-label">
                      {formData.transactionType === 'in' ? 'Quantity In' : 'Quantity Out'}
                    </label>
                    <input
                      type="text"
                      id="transactionQuantity"
                      name="transactionQuantity"
                      className={`form-control ${formErrors.transactionQuantity ? 'is-invalid' : ''}`}
                      value={formData.transactionQuantity}
                      onChange={handleChange}
                    />
                    {formErrors.transactionQuantity && <div className="invalid-feedback">{formErrors.transactionQuantity}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="transactionReason" className="form-label">Reason</label>
                    <input
                      type="text"
                      id="transactionReason"
                      name="transactionReason"
                      className={`form-control ${formErrors.transactionReason ? 'is-invalid' : ''}`}
                      value={formData.transactionReason}
                      onChange={handleChange}
                      placeholder={formData.transactionType === 'in' ? 'e.g., New shipment' : 'e.g., Order #12345'}
                    />
                    {formErrors.transactionReason && <div className="invalid-feedback">{formErrors.transactionReason}</div>}
                  </div>
                </div>
              )}

              <h3 className="form-section-title">Location</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location.warehouse" className="form-label">Warehouse</label>
                  <input
                    type="text"
                    id="location.warehouse"
                    name="location.warehouse"
                    className={`form-control ${formErrors['location.warehouse'] ? 'is-invalid' : ''}`}
                    value={formData.location.warehouse}
                    onChange={handleChange}
                  />
                  {formErrors['location.warehouse'] && <div className="invalid-feedback">{formErrors['location.warehouse']}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="location.section" className="form-label">Section</label>
                  <input
                    type="text"
                    id="location.section"
                    name="location.section"
                    className="form-control"
                    value={formData.location.section}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location.shelf" className="form-label">Shelf</label>
                  <input
                    type="text"
                    id="location.shelf"
                    name="location.shelf"
                    className="form-control"
                    value={formData.location.shelf}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <Link to="/inventory" className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventoryEdit;
