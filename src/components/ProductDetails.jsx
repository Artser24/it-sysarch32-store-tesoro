import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { firestore } from '../firebase/firebase';

const stripePromise = loadStripe('pk_test_51PF3TzP38asw82mTv5P99tz3JCQOvk6SXW1b2XCx5wVrEz9RKHnifVTjSKdgZucxXz8ozGLb7BlTH9DBUjxGDgQK00guvz4zN4'); // Replace with your publishable key

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = await firestore.collection('Products').doc(productId).get();
        if (docRef.exists) {
          const docData = docRef.data();
          setProduct({
            id: docRef.id,
            name: docData.Name,
            price: docData.Price,
            description: docData.Description,
            image: docData.Url,
          });
        } else {
          console.log('Product not found');
          // Handle product not found
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle the click event when the user clicks the "Checkout" button
  const handleClick = async () => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://35.247.140.25:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName: product.name, price: product.price * 100 }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.name} />
      <div>
        <button onClick={handleClick}>Checkout</button>
        {error && <div>{error}</div>}
      </div>
      <Link to="/">Back to Product List</Link> {/* Link to navigate back to ProductList */}
    </div>
  );
};

export default ProductDetails;