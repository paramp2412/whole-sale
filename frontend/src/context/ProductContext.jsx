import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  // Initialize state with sample products
  const [products, setProducts] = useState(() => {
    // Try to get products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    // Default sample products if none in localStorage
    const now = new Date().toISOString();
    return [
      {
        id: 1,
        name: 'Sample Product 1',
        category: 'Massager',
        sku: 'SKU-001',
        price: 99.99,
        costPrice: 59.99,
        stockQuantity: 25,
        lowStockThreshold: 10,
        description: 'A high-quality massager for relaxation and pain relief.',
        supplier: {
          name: 'Wellness Supplies Inc.',
          contactInfo: 'contact@wellnesssupplies.com'
        },
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: 'Sample Product 2',
        category: 'Toys',
        sku: 'SKU-002',
        price: 49.99,
        costPrice: 29.99,
        stockQuantity: 3,
        lowStockThreshold: 5,
        description: 'Educational toys for children ages 3-5.',
        supplier: {
          name: 'Kids First Toys',
          contactInfo: 'sales@kidsfirsttoys.com'
        },
        createdAt: now,
        updatedAt: now
      }
    ];
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Add a new product
  const addProduct = (product) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = products.length > 0
      ? Math.max(...products.map(p => p.id)) + 1
      : 1;

    // Get current timestamp
    const now = new Date().toISOString();

    // Create the new product with the generated ID and timestamps
    const newProduct = {
      ...product,
      id: newId,
      createdAt: now,
      updatedAt: now
    };

    // Update the products state
    setProducts([...products, newProduct]);
    return newProduct;
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    // Ensure the product has an updatedAt timestamp
    if (!updatedProduct.updatedAt) {
      updatedProduct.updatedAt = new Date().toISOString();
    }

    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));

    return updatedProduct;
  };

  // Delete a product
  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Get a product by ID
  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  // The context value that will be provided
  const contextValue = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
