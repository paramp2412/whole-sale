import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/minimal.css';

const SimpleInventoryView = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [transactions, setTransactions] = useState([]);

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
          setInventory({
            id: 1,
            product: {
              id: 1,
              name: 'Sample Product 1',
              sku: 'SKU-001',
              category: 'Massager',
              price: 99.99
            },
            quantity: 25,
            location: {
              warehouse: 'Main Warehouse',
              section: 'A',
              shelf: '3'
            },
            lastUpdated: '2023-05-15T10:30:00Z',
            createdAt: '2023-01-15T10:30:00Z'
          });
          
          setTransactions([
            {
              id: 1,
              type: 'in',
              quantity: 30,
              date: '2023-01-15T10:30:00Z',
              reason: 'Initial stock',
              performedBy: 'Admin User'
            },
            {
              id: 2,
              type: 'out',
              quantity: 5,
              date: '2023-02-20T14:45:00Z',
              reason: 'Order #12345',
              performedBy: 'Sales Rep'
            }
          ]);
        } else if (id === '2') {
          setInventory({
            id: 2,
            product: {
              id: 2,
              name: 'Sample Product 2',
              sku: 'SKU-002',
              category: 'Toys',
              price: 49.99
            },
            quantity: 3,
            location: {
              warehouse: 'Main Warehouse',
              section: 'B',
              shelf: '1'
            },
            lastUpdated: '2023-05-20T09:15:00Z',
            createdAt: '2023-02-10T11:30:00Z'
          });
          
          setTransactions([
            {
              id: 3,
              type: 'in',
              quantity: 15,
              date: '2023-02-10T11:30:00Z',
              reason: 'Initial stock',
              performedBy: 'Admin User'
            },
            {
              id: 4,
              type: 'out',
              quantity: 10,
              date: '2023-04-05T13:20:00Z',
              reason: 'Order #12346',
              performedBy: 'Sales Rep'
            },
            {
              id: 5,
              type: 'out',
              quantity: 2,
              date: '2023-05-18T10:10:00Z',
              reason: 'Order #12350',
              performedBy: 'Sales Rep'
            }
          ]);
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

  if (!inventory) {
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
          <div className="alert alert-danger">Inventory item not found</div>
          <Link to="/inventory" className="btn btn-primary">Back to Inventory</Link>
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
          <h1 className="page-title">Inventory Details</h1>
          <div>
            <Link to="/inventory" className="btn btn-secondary mr-2">
              Back to Inventory
            </Link>
            <Link to={`/inventory/${id}/update`} className="btn btn-primary">
              Update Inventory
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="product-header">
              <h2 className="product-title">{inventory.product.name}</h2>
              <span className={`badge ${inventory.quantity <= 5 ? 'badge-warning' : 'badge-success'}`}>
                {inventory.quantity <= 5 ? 'Low Stock' : 'In Stock'}
              </span>
            </div>

            <div className="product-meta">
              <div className="product-sku">SKU: {inventory.product.sku}</div>
              <div className="product-sku">Category: {inventory.product.category}</div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Current Quantity</h3>
                  <p className="detail-text price">{inventory.quantity} units</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Price</h3>
                  <p className="detail-text">${inventory.product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="detail-group">
                <h3 className="detail-title">Location</h3>
                <p className="detail-text">
                  Warehouse: {inventory.location.warehouse}, 
                  Section: {inventory.location.section}, 
                  Shelf: {inventory.location.shelf}
                </p>
              </div>

              <div className="detail-row">
                <div className="detail-group">
                  <h3 className="detail-title">Created At</h3>
                  <p className="detail-text">{new Date(inventory.createdAt).toLocaleString()}</p>
                </div>
                <div className="detail-group">
                  <h3 className="detail-title">Last Updated</h3>
                  <p className="detail-text">{new Date(inventory.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Transaction History</h3>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${transaction.type === 'in' ? 'badge-success' : 'badge-warning'}`}>
                        {transaction.type === 'in' ? 'Stock In' : 'Stock Out'}
                      </span>
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.reason}</td>
                    <td>{transaction.performedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInventoryView;
