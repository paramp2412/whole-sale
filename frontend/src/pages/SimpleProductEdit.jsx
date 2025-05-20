import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import { convertUSDtoINR, convertINRtoUSD } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleProductEdit = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const { getProductById, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    lowStockThreshold: '',
    supplier: {
      name: '',
      contactInfo: ''
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Convert id to number since our context uses numeric IDs
        const productId = parseInt(id);
        if (isNaN(productId)) {
          navigate('/products');
          return;
        }

        // Get product from context
        const foundProduct = getProductById(productId);

        if (foundProduct) {
          // Convert numeric values to strings for form inputs
          // Convert USD prices to INR for display
          setFormData({
            ...foundProduct,
            price: convertUSDtoINR(foundProduct.price).toString(),
            costPrice: convertUSDtoINR(foundProduct.costPrice).toString(),
            stockQuantity: foundProduct.stockQuantity.toString(),
            lowStockThreshold: foundProduct.lowStockThreshold.toString(),
            // Ensure supplier object exists
            supplier: foundProduct.supplier || {
              name: '',
              contactInfo: ''
            }
          });
        } else {
          // If product not found, navigate back to products page
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, getProductById]);

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
      errors.stockQuantity = 'Stock quantity must be a non-negative integer';
    }

    if (!formData.lowStockThreshold.trim()) {
      errors.lowStockThreshold = 'Low stock threshold is required';
    } else if (isNaN(parseInt(formData.lowStockThreshold)) || parseInt(formData.lowStockThreshold) < 0) {
      errors.lowStockThreshold = 'Low stock threshold must be a non-negative integer';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Convert form data to appropriate types
        // Convert INR prices back to USD for storage
        const productData = {
          ...formData,
          id: parseInt(id),
          price: convertINRtoUSD(parseFloat(formData.price)),
          costPrice: convertINRtoUSD(parseFloat(formData.costPrice)),
          stockQuantity: parseInt(formData.stockQuantity),
          lowStockThreshold: parseInt(formData.lowStockThreshold),
          updatedAt: new Date().toISOString()
        };

        // Update the product in context
        updateProduct(productData);

        // Show success message
        setSuccessMessage('Product updated successfully!');

        // Redirect to products page after 2 seconds
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } catch (error) {
        console.error('Error updating product:', error);
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
              <Link to="/products" className="nav-link active">Products</Link>
              <Link to="/customers" className="nav-link">Customers</Link>
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
            <Link to="/products" className="nav-link active">Products</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Product</h1>
          <Link to="/products" className="btn btn-secondary">
            Back to Products
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
                  <label htmlFor="name" className="form-label">Product Name</label>
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
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    id="category"
                    name="category"
                    className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Massager">Massager</option>
                    <option value="Toys">Toys</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sku" className="form-label">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    className={`form-control ${formErrors.sku ? 'is-invalid' : ''}`}
                    value={formData.sku}
                    onChange={handleChange}
                  />
                  {formErrors.sku && <div className="invalid-feedback">{formErrors.sku}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price (₹)</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="costPrice" className="form-label">Cost Price (₹)</label>
                  <input
                    type="text"
                    id="costPrice"
                    name="costPrice"
                    className={`form-control ${formErrors.costPrice ? 'is-invalid' : ''}`}
                    value={formData.costPrice}
                    onChange={handleChange}
                  />
                  {formErrors.costPrice && <div className="invalid-feedback">{formErrors.costPrice}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                  <input
                    type="text"
                    id="stockQuantity"
                    name="stockQuantity"
                    className={`form-control ${formErrors.stockQuantity ? 'is-invalid' : ''}`}
                    value={formData.stockQuantity}
                    onChange={handleChange}
                  />
                  {formErrors.stockQuantity && <div className="invalid-feedback">{formErrors.stockQuantity}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="lowStockThreshold" className="form-label">Low Stock Threshold</label>
                  <input
                    type="text"
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    className={`form-control ${formErrors.lowStockThreshold ? 'is-invalid' : ''}`}
                    value={formData.lowStockThreshold}
                    onChange={handleChange}
                  />
                  {formErrors.lowStockThreshold && <div className="invalid-feedback">{formErrors.lowStockThreshold}</div>}
                </div>
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="supplier.name" className="form-label">Supplier Name</label>
                  <input
                    type="text"
                    id="supplier.name"
                    name="supplier.name"
                    className="form-control"
                    value={formData.supplier.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier.contactInfo" className="form-label">Supplier Contact</label>
                  <input
                    type="text"
                    id="supplier.contactInfo"
                    name="supplier.contactInfo"
                    className="form-control"
                    value={formData.supplier.contactInfo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default SimpleProductEdit;
