import React, { useContext } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

import '../scan/scan.css';

const Scan = () => {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleQRScan = async (result) => {
    if (result) {
      const data = { userId, basketId: result };
      console.log(data);

      try {
        const response = await fetch('https://smart-backend-zs75.onrender.com/assign-basket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const data1 = await response.json();

        if (response.ok) {
          console.log(data1.message);
          navigate('/cart');
        } else {
          console.error('Error:', data1.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  return (
    <div className="scan-container">
      <h2>Scan Basket QR Code</h2>
      <QrScanner
        onDecode={handleQRScan}
        onError={(error) => console.log(error?.message)}
      />
      <button onClick={goToCartPage}>Go to Cart</button>
    </div>
  );
};

export default Scan;