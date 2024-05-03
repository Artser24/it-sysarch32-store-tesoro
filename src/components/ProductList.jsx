import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firestore.collection('Products').get();
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().Name,
          price: doc.data().Price,
          description: doc.data().Description,
          image: doc.data().Url,
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
            <p>Description: {product.description}</p>
            <img src={product.image} alt={product.name} /> {/* Display product image */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
