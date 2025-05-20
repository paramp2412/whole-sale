import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleStaff = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
            <Link to="/inventory" className="nav-link">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="nav-link active">Staff</Link>
            )}
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Staff Management</h1>
          <Link
            to="/staff/add"
            className="btn btn-primary"
          >
            Add New Staff
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="department" className="form-label">
                  Filter by Department
                </label>
                <select
                  id="department"
                  className="form-control"
                >
                  <option value="">All Departments</option>
                  <option value="Sales">Sales</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Staff
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or position"
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
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '500' }}>Michael Johnson</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Sales Manager
                    </span>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Sales
                    </span>
                  </td>
                  <td>michael.j@example.com</td>
                  <td>
                    <span className="badge badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="performance-bar">
                      <div className="performance-progress" style={{ width: '85%', backgroundColor: 'var(--success-color)' }}></div>
                    </div>
                    <span className="performance-text">85%</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/staff/1" className="action-link">View</Link>
                      <Link to="/staff/1/edit" className="action-link edit">Edit</Link>
                      <button className="action-link delete" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Deactivate</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Sarah Williams</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Inventory Specialist
                    </span>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Inventory
                    </span>
                  </td>
                  <td>sarah.w@example.com</td>
                  <td>
                    <span className="badge badge-success">
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="performance-bar">
                      <div className="performance-progress" style={{ width: '92%', backgroundColor: 'var(--success-color)' }}></div>
                    </div>
                    <span className="performance-text">92%</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/staff/2" className="action-link">View</Link>
                      <Link to="/staff/2/edit" className="action-link edit">Edit</Link>
                      <button className="action-link delete" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Deactivate</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '500' }}>Robert Davis</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Customer Service Rep
                    </span>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      color: 'var(--text-medium)',
                      fontWeight: '500'
                    }}>
                      Customer Service
                    </span>
                  </td>
                  <td>robert.d@example.com</td>
                  <td>
                    <span className="badge badge-danger">
                      Inactive
                    </span>
                  </td>
                  <td>
                    <div className="performance-bar">
                      <div className="performance-progress" style={{ width: '65%', backgroundColor: 'var(--warning-color)' }}></div>
                    </div>
                    <span className="performance-text">65%</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to="/staff/3" className="action-link">View</Link>
                      <Link to="/staff/3/edit" className="action-link edit">Edit</Link>
                      <button className="action-link" style={{ color: 'var(--success-color)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Activate</button>
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

export default SimpleStaff;
