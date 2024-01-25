import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import '../cart/cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { userId } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCartItems = () => {
      // Fetch cart items using the provided endpoint and userId
      fetch('https://smart-backend-zs75.onrender.com/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setCartItems(data.items);
          setTotal(data.total);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    const intervalId = setInterval(() => {
      fetchCartItems();
    }, 1100);
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [userId]);

  const handleRemoveFromCart = (product_id) => {
    // Send a request to remove the item from the cart on the server
    fetch(`https://smart-backend-zs75.onrender.com/cart/remove/${userId}/${product_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the removal is successful, update the cart items
          setCartItems((prevCartItems) => prevCartItems.filter((item) => item.product_id !== product_id));
        } else if (response.status === 404) {
          // Handle the case where the item was not found in the cart
          console.log('Item not found in the cart');
        } else {
          // Handle other removal errors
          console.error('Error removing item from cart');
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };
   
  const handleCheckout = () => {
    // Implement the checkout logic here
    navigate('/checkout')
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.product_id} className="cart-item">
            <div className="item-details">
              <h3>{item.product_name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => handleRemoveFromCart(item.product_id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="total">
        <p>Total: GHS {total.toFixed(2)}</p>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
