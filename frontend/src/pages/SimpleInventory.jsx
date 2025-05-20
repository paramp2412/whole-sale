import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleInventory = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link active">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="nav-link">Staff</Link>
            )}
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Inventory</h1>
          <div className="d-flex gap-2">
            <Link
              to="/inventory/add-transaction"
              className="btn btn-primary"
            >
              Add Transaction
            </Link>
            <Link
              to="/inventory/update"
              className="btn btn-secondary"
            >
              Bulk Update
            </Link>
          </div>
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
                >
                  <option value="">All Categories</option>
                  <option value="Massager">Massager</option>
                  <option value="Toys">Toys</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="stockStatus" className="form-label">
                  Stock Status
                </label>
                <select
                  id="stockStatus"
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
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
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sample Product 1</td>
                  <td>SKU-001</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Massager
                    </span>
                  </td>
                  <td>25</td>
                  <td>
                    <span className="badge badge-success">
                      In Stock
                    </span>
                  </td>
                  <td>2023-05-15</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/inventory/1" className="action-link">View</Link>
                      <Link to="/inventory/1/update" className="action-link edit">Update</Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sample Product 2</td>
                  <td>SKU-002</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Toys
                    </span>
                  </td>
                  <td>3</td>
                  <td>
                    <span className="badge badge-warning">
                      Low Stock
                    </span>
                  </td>
                  <td>2023-05-20</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/inventory/2" className="action-link">View</Link>
                      <Link to="/inventory/2/update" className="action-link edit">Update</Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sample Product 3</td>
                  <td>SKU-003</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Books
                    </span>
                  </td>
                  <td>0</td>
                  <td>
                    <span className="badge badge-danger">
                      Out of Stock
                    </span>
                  </td>
                  <td>2023-05-10</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/inventory/3" className="action-link">View</Link>
                      <Link to="/inventory/3/update" className="action-link edit">Update</Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventory;
