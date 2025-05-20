import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const authLinks = (
    <>
      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Dashboard
      </Link>
      <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Products
      </Link>
      <Link to="/customers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Customers
      </Link>
      <Link to="/inventory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Inventory
      </Link>
      {user && user.role === 'admin' && (
        <Link to="/staff" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
          Staff
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Login
      </Link>
      <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:px-3 md:py-2 md:text-base md:hover:bg-transparent md:hover:text-blue-700">
        Register
      </Link>
    </>
  );

  return (
    <nav className="bg-white border-gray-200 px-4 py-2.5 shadow-md">
      <div className="flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">Wholesale Management</span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
