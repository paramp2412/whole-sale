import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import { convertINRtoUSD } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleAddProduct = () => {
  const { user, logout } = useContext(AuthContext);
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sku: '',
    price: '',
    costPrice: '',
    stockQuantity: '',
    lowStockThreshold: '10',
    supplier: {
      name: '',
      contactInfo: ''
    }
  });

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
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }

    if (!formData.sku.trim()) {
      errors.sku = 'SKU is required';
    }

    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }

    if (!formData.costPrice.trim()) {
      errors.costPrice = 'Cost price is required';
    } else if (isNaN(parseFloat(formData.costPrice)) || parseFloat(formData.costPrice) < 0) {
      errors.costPrice = 'Cost price must be a non-negative number';
    }

    if (!formData.stockQuantity.trim()) {
      errors.stockQuantity = 'Stock quantity is required';
    } else if (isNaN(parseInt(formData.stockQuantity)) || parseInt(formData.stockQuantity) < 0) {
      errors.stockQuantity = 'Stock quantity must be a non-negative number';
    }

    if (!formData.lowStockThreshold.trim()) {
      errors.lowStockThreshold = 'Low stock threshold is required';
    } else if (isNaN(parseInt(formData.lowStockThreshold)) || parseInt(formData.lowStockThreshold) < 0) {
      errors.lowStockThreshold = 'Low stock threshold must be a non-negative number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Convert numeric fields to numbers and convert INR to USD for storage
        const productData = {
          ...formData,
          // Convert INR to USD for storage in the database
          price: convertINRtoUSD(parseFloat(formData.price)),
          costPrice: convertINRtoUSD(parseFloat(formData.costPrice)),
          stockQuantity: parseInt(formData.stockQuantity),
          lowStockThreshold: parseInt(formData.lowStockThreshold)
        };

        // Add the product to the context
        addProduct(productData);

        // Show success message
        setSuccessMessage('Product added successfully!');

        // Reset form after success
        setFormData({
          name: '',
          description: '',
          category: '',
          sku: '',
          price: '',
          costPrice: '',
          stockQuantity: '',
          lowStockThreshold: '10',
          supplier: {
            name: '',
            contactInfo: ''
          }
        });

        // Redirect to products page after 2 seconds
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } catch (error) {
        console.error('Error adding product:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fade-in">
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="brand">WholesaleFlow</Link>

          <nav className="nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/products" className="nav-link active">Products</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="nav-link">Staff</Link>
            )}
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add New Product</h1>
          <Link to="/products" className="btn btn-secondary">
            Back to Products
          </Link>
        </div>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                />
                {formErrors.name && (
                  <div className="invalid-feedback">{formErrors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="form-control"
                />
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Category</option>
                    <option value="Massager">Massager</option>
                    <option value="Toys">Toys</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.category && (
                    <div className="invalid-feedback">{formErrors.category}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="sku" className="form-label">
                    SKU <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className={`form-control ${formErrors.sku ? 'is-invalid' : ''}`}
                  />
                  {formErrors.sku && (
                    <div className="invalid-feedback">{formErrors.sku}</div>
                  )}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price (₹) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                  />
                  {formErrors.price && (
                    <div className="invalid-feedback">{formErrors.price}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="costPrice" className="form-label">
                    Cost Price (₹) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="costPrice"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`form-control ${formErrors.costPrice ? 'is-invalid' : ''}`}
                  />
                  {formErrors.costPrice && (
                    <div className="invalid-feedback">{formErrors.costPrice}</div>
                  )}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="stockQuantity" className="form-label">
                    Stock Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    className={`form-control ${formErrors.stockQuantity ? 'is-invalid' : ''}`}
                  />
                  {formErrors.stockQuantity && (
                    <div className="invalid-feedback">{formErrors.stockQuantity}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lowStockThreshold" className="form-label">
                    Low Stock Threshold <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    value={formData.lowStockThreshold}
                    onChange={handleChange}
                    min="0"
                    className={`form-control ${formErrors.lowStockThreshold ? 'is-invalid' : ''}`}
                  />
                  {formErrors.lowStockThreshold && (
                    <div className="invalid-feedback">{formErrors.lowStockThreshold}</div>
                  )}
                </div>
              </div>

              <h3 className="form-section-title">Supplier Information</h3>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="supplier.name" className="form-label">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    id="supplier.name"
                    name="supplier.name"
                    value={formData.supplier.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier.contactInfo" className="form-label">
                    Supplier Contact Info
                  </label>
                  <input
                    type="text"
                    id="supplier.contactInfo"
                    name="supplier.contactInfo"
                    value={formData.supplier.contactInfo}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
                <Link to="/products" className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAddProduct;
