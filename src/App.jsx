import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF3TzP38asw82mTv5P99tz3JCQOvk6SXW1b2XCx5wVrEz9RKHnifVTjSKdgZucxXz8ozGLb7BlTH9DBUjxGDgQK00guvz4zN4'); // Replace with your publishable key

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;