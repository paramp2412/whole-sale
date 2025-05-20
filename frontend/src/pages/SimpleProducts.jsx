import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductContext from '../context/ProductContext';
import { convertAndFormatINR } from '../utils/currencyUtils';
import '../styles/minimal.css';

const SimpleProducts = () => {
  const { user, logout } = useContext(AuthContext);
  const { products, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
    productName: ''
  });

  // Filter products when products, categoryFilter, or searchQuery changes
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [products, categoryFilter, searchQuery]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteClick = (productId, productName) => {
    setDeleteModal({
      isOpen: true,
      productId,
      productName
    });
  };

  const handleConfirmDelete = () => {
    deleteProduct(deleteModal.productId);
    setDeleteModal({
      isOpen: false,
      productId: null,
      productName: ''
    });
  };

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      productId: null,
      productName: ''
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <Link to="/products/add" className="btn btn-primary">
            Add New Product
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="category" className="form-label">
                  Filter by Category
                </label>
                <select
                  id="category"
                  className="form-control"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or SKU"
                  className="form-control"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {products.length === 0 ?
                        "No products found. Add your first product!" :
                        "No products match your filters."}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
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
                        {product.stockQuantity <= 0 ? (
                          <span className="badge badge-danger">
                            Out of Stock
                          </span>
                        ) : product.stockQuantity <= product.lowStockThreshold ? (
                          <span className="badge badge-warning">
                            Low Stock ({product.stockQuantity})
                          </span>
                        ) : (
                          <span className="badge badge-success">
                            In Stock ({product.stockQuantity})
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/products/${product.id}`} className="action-link">View</Link>
                          <Link to={`/products/${product.id}/edit`} className="action-link edit">Edit</Link>
                          <button
                            className="action-link delete"
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            onClick={() => handleDeleteClick(product.id, product.name)}
                          >
                            Delete
                          </button>
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

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteModal.productName}</strong>?</p>
              <p className="text-danger">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleProducts;
