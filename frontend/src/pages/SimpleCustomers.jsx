import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleCustomers = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    customerId: null,
    customerName: ''
  });

  useEffect(() => {
    // In a real application, you would fetch customers from your API
    // For now, we'll use mock data
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock customer data
        const mockCustomers = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            company: 'ABC Retail',
            segment: 'Retail',
            totalSpent: 5250.00
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            company: 'XYZ Distributors',
            segment: 'Distributor',
            totalSpent: 12750.00
          }
        ];

        setCustomers(mockCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteClick = (customerId, customerName) => {
    setDeleteModal({
      isOpen: true,
      customerId,
      customerName
    });
  };

  const handleConfirmDelete = async () => {
    try {
      // In a real application, you would call your API to delete the customer
      // For now, we'll just update the state

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update state by filtering out the deleted customer
      setCustomers(customers.filter(customer => customer.id !== deleteModal.customerId));

      // Close the modal
      setDeleteModal({
        isOpen: false,
        customerId: null,
        customerName: ''
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      customerId: null,
      customerName: ''
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
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/customers" className="nav-link active">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Customers</h1>
          <Link to="/customers/add" className="btn btn-primary">
            Add New Customer
          </Link>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div className="form-group" style={{ minWidth: '200px', flex: 1 }}>
                <label htmlFor="segment" className="form-label">
                  Filter by Segment
                </label>
                <select id="segment" className="form-control">
                  <option value="">All Segments</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="distributor">Distributor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group" style={{ minWidth: '250px', flex: 2 }}>
                <label htmlFor="search" className="form-label">
                  Search Customers
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, email, or company"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : customers.length === 0 ? (
              <div className="empty-state">
                <p>No customers found. <Link to="/customers/add">Add a new customer</Link>.</p>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Segment</th>
                    <th>Total Spent</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id}>
                      <td style={{ fontWeight: '500' }}>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          color: 'var(--text-medium)',
                          fontWeight: '500'
                        }}>
                          {customer.company}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${customer.segment === 'Retail' ? 'badge-primary' : 'badge-success'}`}>
                          {customer.segment}
                        </span>
                      </td>
                      <td style={{ fontWeight: '500', color: 'var(--success-color)' }}>
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/customers/${customer.id}`} className="action-link">View</Link>
                          <Link to={`/customers/${customer.id}/edit`} className="action-link edit">Edit</Link>
                          <button
                            className="action-link delete"
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            onClick={() => handleDeleteClick(customer.id, customer.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
                <p>Are you sure you want to delete <strong>{deleteModal.customerName}</strong>?</p>
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
    </div>
  );
};

export default SimpleCustomers;
