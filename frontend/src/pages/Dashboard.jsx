import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    totalStaff: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would have an endpoint to fetch all stats at once
        // For now, we'll simulate it with separate requests
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const customersRes = await axios.get('http://localhost:5000/api/customers');

        // Only fetch staff data if user is admin
        let staffCount = 0;
        if (user && user.role === 'admin') {
          const staffRes = await axios.get('http://localhost:5000/api/staff');
          staffCount = staffRes.data.length;
        }

        // Calculate low stock products
        const lowStockProducts = productsRes.data.filter(
          (product) => product.stockQuantity <= product.lowStockThreshold
        );

        setStats({
          totalProducts: productsRes.data.length,
          lowStockProducts: lowStockProducts.length,
          totalCustomers: customersRes.data.length,
          totalStaff: staffCount,
        });

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">Wholesale Management</Link>

          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">Dashboard</Link>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">Products</Link>
            <Link to="/customers" className="text-blue-600 hover:text-blue-800">Customers</Link>
            <Link to="/inventory" className="text-blue-600 hover:text-blue-800">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="text-blue-600 hover:text-blue-800">Staff</Link>
            )}
            <button onClick={handleLogout} className="text-blue-600 hover:text-blue-800">Logout</button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 bg-white border-t border-gray-200">
            <Link to="/dashboard" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Dashboard</Link>
            <Link to="/products" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Products</Link>
            <Link to="/customers" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Customers</Link>
            <Link to="/inventory" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Inventory</Link>
            {user && user.role === 'admin' && (
              <Link to="/staff" className="block px-4 py-2 text-blue-600 hover:bg-gray-100">Staff</Link>
            )}
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100">Logout</button>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 bg-blue-50 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-semibold">{stats.totalProducts}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/products" className="text-blue-500 hover:text-blue-700 text-sm">
                View all products →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock Products</p>
                <p className="text-xl font-semibold">{stats.lowStockProducts}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/products/low-stock" className="text-red-500 hover:text-red-700 text-sm">
                View low stock →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 bg-green-50 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-semibold">{stats.totalCustomers}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/customers" className="text-green-500 hover:text-green-700 text-sm">
                View all customers →
              </Link>
            </div>
          </div>

          {user && user.role === 'admin' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 bg-purple-50 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Staff</p>
                  <p className="text-xl font-semibold">{stats.totalStaff}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/staff" className="text-purple-500 hover:text-purple-700 text-sm">
                  View all staff →
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-500">No recent activities to display.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-2">
                <Link to="/products/add" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Add New Product</span>
                  </div>
                </Link>

                <Link to="/customers/add" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Add New Customer</span>
                  </div>
                </Link>

                <Link to="/inventory/update" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span>Update Inventory</span>
                  </div>
                </Link>

                {user && user.role === 'admin' && (
                  <Link to="/staff/add" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span>Add New Staff</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
