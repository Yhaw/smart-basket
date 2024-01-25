import React, { useEffect, useState ,useContext} from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

import './checkout.css';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { userId } = useContext(UserContext);
  //const [shipping, setShipping] = useState(0); // Example shipping cost
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  //navigate('/scan');


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://smart-backend-zs75.onrender.com/cart/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCartItems(data.items);

        const calculatedSubtotal = data.items.reduce((acc, item) => {
          // Convert the price string to a number before adding to the subtotal
          const price = parseFloat(item.price);
          return acc + (isNaN(price) ? 0 : price) * item.quantity;
        }, 0);
        setSubtotal(calculatedSubtotal);

        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    setTotal(subtotal);
  }, [subtotal]);

  const handlePayment = async () => {
    try {
      // Make a post request to the server endpoint for handling payments
      const response = await fetch('https://smart-backend-zs75.onrender.com/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (response.ok) {
        alert('Payment Successful');
        navigate('/final')
      }
      else{
        alert('Payment Failed');

        throw new Error('Network response was not ok');

      }

    } catch (error) {
      console.error('Error:', error);
      alert('Payment Failed');
    }
  };
  
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="branding">
          <span className="brand-icon">SC</span>
          <span className="brand-name">SmartCart</span>
          <span className="test-mode">TEST MODE</span>
        </div>
        <div className="amount-due">GHS {total.toFixed(2)}</div>
      </div>

      {isLoading ? (
        <div>Loading cart items...</div>
      ) : (
        <div>
          <div className="items-section">
            {cartItems.map((item) => (
              <div className="item" key={item.product_id}>
                <div className="item-name">{item.product_name}</div>
                <div className="item-details">
                  Qty {item.quantity} × GHS {(item.price ? parseFloat(item.price).toFixed(2) : 'N/A')} each
                </div>
              </div>
            ))}
          </div>

          <div className="totals-section">
            <div className="subtotal">Subtotal: GHS {subtotal.toFixed(2)}</div>
             <div className="total">Total due: GHS {total.toFixed(2)}</div>
          </div>

          <div className="payment-section">
            <div className="pay-button" onClick={handlePayment}>
              Pay
            </div>
            <div className="alternative-payment">Or pay with card</div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea placeholder="Enter address"></textarea>
            </div>
            <div className="form-group">
              <label>Card Information:</label>
              <input type="text" placeholder="1234 1234 1234 1234" />
            </div>
            <div className="form-group">
              <label>Expiry:</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVC:</label>
              <input type="text" placeholder="CVC" />
            </div>
            <div className="form-group checkbox-group">
              <input type="checkbox" id="sameAddress" />
              <label htmlFor="sameAddress">Billing address is same as shipping</label>
            </div>
            <div className="pay-button final" onClick={handlePayment}>
              Pay GHS {total.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        Powered by SYIndustries | Terms | Privacy
      </div>
    </div>
  );
};

export default CheckoutPage;