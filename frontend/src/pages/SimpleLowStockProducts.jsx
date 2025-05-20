import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import { convertAndFormatINR } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleLowStockProducts = () => {
  const { user, logout } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // Filter products that are low in stock
    const filtered = products.filter(product => 
      product.stockQuantity <= product.lowStockThreshold
    );
    setLowStockProducts(filtered);
  }, [products]);

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
          <h1 className="page-title">Low Stock Products</h1>
          <div>
            <Link to="/products" className="btn btn-secondary mr-2">
              All Products
            </Link>
            <Link to="/products/add" className="btn btn-primary">
              Add New Product
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="alert alert-warning">
              These products are below or at their low stock threshold and may need to be restocked soon.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Threshold</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No low stock products found.
                    </td>
                  </tr>
                ) : (
                  lowStockProducts.map(product => (
                    <tr key={product.id}>
                      <td style={{ fontWeight: '500' }}>{product.name}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: product.category === 'Massager' ? 'rgba(58, 123, 213, 0.1)' :
                                          product.category === 'Toys' ? 'rgba(0, 194, 168, 0.1)' :
                                          'rgba(100, 100, 100, 0.1)',
                          color: product.category === 'Massager' ? 'var(--primary-color)' :
                                product.category === 'Toys' ? 'var(--accent-color)' :
                                'var(--text-medium)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {product.category}
                        </span>
                      </td>
                      <td>{product.sku}</td>
                      <td style={{ fontWeight: '500' }}>{convertAndFormatINR(parseFloat(product.price))}</td>
                      <td>
                        <span className="badge badge-danger">
                          {product.stockQuantity} units
                        </span>
                      </td>
                      <td>{product.lowStockThreshold} units</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/products/${product.id}`} className="action-link">View</Link>
                          <Link to={`/products/${product.id}/edit`} className="action-link edit">Edit</Link>
                          <Link to="/inventory/update" className="action-link" style={{ color: 'var(--success-color)' }}>Restock</Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLowStockProducts;
