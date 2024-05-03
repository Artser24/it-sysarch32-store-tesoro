import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.name} />
      <Link to="/products">Back to Product List</Link> {/* Link to navigate back to ProductList */}
    </div>
  );
};

export default ProductDetails;
