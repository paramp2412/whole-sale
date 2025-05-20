import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Products = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">Wholesale Management</Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">Products</Link>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Link 
            to="/products/add" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          >
            Add New Product
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
              <select 
                id="category" 
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Massager">Massager</option>
                <option value="Toys">Toys</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
              <input 
                type="text" 
                id="search" 
                placeholder="Search by name or SKU" 
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Sample Product 1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Massager</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">SKU-001</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">$99.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Stock (25)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to="/products/1" className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                  <Link to="/products/1/edit" className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Sample Product 2</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">Toys</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">SKU-002</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">$49.99</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Low Stock (3)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to="/products/2" className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                  <Link to="/products/2/edit" className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
