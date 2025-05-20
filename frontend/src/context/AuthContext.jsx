import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Mock users for demo
  const mockUsers = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin', role: 'admin' },
    { id: 2, name: 'Staff User', email: 'staff@example.com', password: 'staff', role: 'staff' }
  ];

  // Register user (mock implementation)
  const register = async (formData) => {
    try {
      // Check if email already exists
      const existingUser = mockUsers.find(user => user.email === formData.email);
      if (existingUser) {
        setError('User with this email already exists');
        return false;
      }

      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name: formData.name || 'New User',
        email: formData.email,
        password: formData.password,
        role: 'staff' // Default role for new users
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Registration failed');
      return false;
    }
  };

  // Login user (mock implementation)
  const login = async (formData) => {
    try {
      // Find user by email
      const user = mockUsers.find(user => user.email === formData.email);

      // Check if user exists and password matches
      if (!user || user.password !== formData.password) {
        setError('Invalid credentials');
        return false;
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError('Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear errors
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
