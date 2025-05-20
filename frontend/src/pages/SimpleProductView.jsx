import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import { convertAndFormatINR } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleProductView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const { getProductById } = useContext(ProductContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

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
          // Add timestamps if they don't exist
          if (!foundProduct.createdAt) {
            foundProduct.createdAt = new Date().toISOString();
          }
          if (!foundProduct.updatedAt) {
            foundProduct.updatedAt = new Date().toISOString();
          }

          setProduct(foundProduct);
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

  if (!product) {
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
          <div className="alert alert-danger">Product not found</div>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
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
          <h1 className="page-title">Product Details</h1>
          <div>
            <Link to="/products" className="btn btn-secondary mr-2">
              Back to Products
            </Link>
            <Link to={`/products/${id}/edit`} className="btn btn-primary">
              Edit Product
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{product.name}</h2>
              <span className={`badge ${product.stockQuantity < product.lowStockThreshold ? 'badge-warning' : 'badge-success'}`}>
                {product.stockQuantity < product.lowStockThreshold ? `Low Stock (${product.stockQuantity})` : `In Stock (${product.stockQuantity})`}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-category">
                <span className="category-badge" style={{
                  backgroundColor: product.category === 'Massager' ? 'rgba(58, 123, 213, 0.1)' : 'rgba(0, 194, 168, 0.1)',
                  color: product.category === 'Massager' ? 'var(--primary-color)' : 'var(--accent-color)'
                }}>
                  {product.category}
                </span>
              </div>
              <div className="product-sku">SKU: {product.sku}</div>
            </div>

            <div className="product-details">
              <div className="detail-group">
                <h3 className="detail-title">Description</h3>
                <p className="detail-text">{product.description}</p>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Price</h3>
                  <p className="detail-text price">{convertAndFormatINR(product.price)}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Cost Price</h3>
                  <p className="detail-text">{convertAndFormatINR(product.costPrice)}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Stock Quantity</h3>
                  <p className="detail-text">{product.stockQuantity} units</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Low Stock Threshold</h3>
                  <p className="detail-text">{product.lowStockThreshold} units</p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Supplier Information</h3>
                <p className="detail-text">{product.supplier.name} - {product.supplier.contactInfo}</p>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Created At</h3>
                  <p className="detail-text">{new Date(product.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Last Updated</h3>
                  <p className="detail-text">{new Date(product.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProductView;
