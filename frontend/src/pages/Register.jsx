import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { register, isAuthenticated, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear field error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = 'Username is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;

      const success = await register(registerData);

      setIsSubmitting(false);

      if (success) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">Wholesale Management</Link>
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Register</h1>

          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
              <button
                onClick={clearError}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                aria-label="Close"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg border border-gray-200 px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.username && <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
