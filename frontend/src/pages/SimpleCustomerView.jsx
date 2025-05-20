import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleCustomerView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // In a real application, you would fetch the customer data from your API
    // For now, we'll simulate fetching data
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock customer data based on ID
        if (id === '1') {
          setCustomer({
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            company: 'ABC Retail',
            segment: 'Retail',
            industry: 'Consumer Goods',
            address: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            },
            totalSpent: 5250.00,
            lastPurchase: '2023-05-10T14:30:00Z',
            notes: 'Prefers email communication. Interested in bulk discounts.',
            createdAt: '2023-01-15T10:30:00Z',
            updatedAt: '2023-05-12T09:45:00Z'
          });
        } else if (id === '2') {
          setCustomer({
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '+1 (555) 987-6543',
            company: 'XYZ Distributors',
            segment: 'Distributor',
            industry: 'Wholesale',
            address: {
              street: '456 Market Ave',
              city: 'Chicago',
              state: 'IL',
              zipCode: '60601',
              country: 'USA'
            },
            totalSpent: 12750.00,
            lastPurchase: '2023-05-18T11:15:00Z',
            notes: 'Key account. Monthly ordering schedule.',
            createdAt: '2023-02-20T09:15:00Z',
            updatedAt: '2023-05-18T11:20:00Z'
          });
        } else {
          // If customer not found, navigate back to customers page
          navigate('/customers');
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  if (loading) {
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
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!customer) {
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
          <div className="alert alert-danger">Customer not found</div>
          <Link to="/customers" className="btn btn-primary">Back to Customers</Link>
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
            <Link to="/customers" className="nav-link active">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/login" onClick={handleLogout} className="nav-link">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Customer Details</h1>
          <div>
            <Link to="/customers" className="btn btn-secondary mr-2">
              Back to Customers
            </Link>
            <Link to={`/customers/${id}/edit`} className="btn btn-primary">
              Edit Customer
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{customer.name}</h2>
              <span className="badge badge-primary">
                {customer.segment}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-sku">Company: {customer.company}</div>
              <div className="product-sku">Industry: {customer.industry}</div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Contact Information</h3>
                  <p className="detail-text">Email: {customer.email}</p>
                  <p className="detail-text">Phone: {customer.phone}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Financial</h3>
                  <p className="detail-text price">${customer.totalSpent.toFixed(2)} Total Spent</p>
                  <p className="detail-text">Last Purchase: {new Date(customer.lastPurchase).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Address</h3>
                <p className="detail-text">
                  {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.zipCode}, {customer.address.country}
                </p>
              </div>

              {customer.notes && (
                <div className="detail-group">
                  <h3 className="detail-title">Notes</h3>
                  <p className="detail-text">{customer.notes}</p>
                </div>
              )}

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Created At</h3>
                  <p className="detail-text">{new Date(customer.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Last Updated</h3>
                  <p className="detail-text">{new Date(customer.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCustomerView;
