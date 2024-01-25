import React, { useState } from 'react';
import './admin.css';

const AdminPage = () => {
  const [product, setProduct] = useState({ product_id: '', product_name: '', price: '' });
  const [basket, setBasket] = useState({ basketId: '', basketName: '' });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBasketChange = (e) => {
    const { name, value } = e.target;
    setBasket({ ...basket, [name]: value });
  };

  const handleAddProduct = () => {
    fetch('https://smart-backend-zs75.onrender.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          alert('Product added successfully');
          setProduct({ product_id: '', product_name: '', price: '' });
        } else {
          alert('Failed to add product');
        }
      })
      .catch((error) => {
        alert('Failed to add product');
      });
  };

  const handleAddBasket = () => {
    fetch('https://smart-backend-zs75.onrender.com/add-basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basket),
    })
      .then((response) => {
        if (response.ok) {
          alert('Basket added successfully');
          setBasket({ basketId: '', basketName: '' });
        } else {
          alert('Failed to add basket');
        }
      })
      .catch((error) => {
        alert('Failed to add basket');
      });
  };

  const handleClearBasket = () => {
    fetch('https://smart-backend-zs75.onrender.com/reset/shop_baskets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Basket cleared successfully');
        } else {
          alert('Failed to clear basket');
        }
      })
      .catch((error) => {
        alert('Failed to clear basket');
      });
  };

  const handleClearCart = () => {
    fetch('https://smart-backend-zs75.onrender.com/reset/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Cart cleared successfully');
        } else {
          alert('Failed to clear cart');
        }
      })
      .catch((error) => {
        alert('Failed to clear cart');
      });
  };

  const handleClearProducts = () => {
    fetch('https://smart-backend-zs75.onrender.com/reset/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Products cleared successfully');
        } else {
          alert('Failed to clear products');
        }
      })
      .catch((error) => {
        alert('Failed to clear products');
      });
  };

  const handleReleaseBasket = () => {
    fetch('https://smart-backend-zs75.onrender.com/reset/user_baskets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Basket released successfully');
        } else {
          alert('Failed to release basket');
        }
      })
      .catch((error) => {
        alert('Failed to release basket');
      });
  };

  return (
    <div className="admin-container">
      <h1>Add Product</h1>
      <input
        type="text"
        name="product_id"
        placeholder="Product ID"
        value={product.product_id}
        onChange={handleProductChange}
      />
      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        value={product.product_name}
        onChange={handleProductChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleProductChange}
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <h1>Add Basket</h1>
      <input
        type="text"
        name="basketId"
        placeholder="Basket ID"
        value={basket.basketId}
        onChange={handleBasketChange}
      />
      <input
        type="text"
        name="basketName"
        placeholder="Basket Name"
        value={basket.basketName}
        onChange={handleBasketChange}
      />
      <button onClick={handleAddBasket}>Add Basket</button>
      <br></br>
      <h1>ADMIN PANEL</h1>
      {/* New buttons */}
      <button onClick={handleClearBasket}>Clear Basket</button> <br></br><button onClick={handleClearCart}>Clear Cart</button>
      <br></br>
      <button onClick={handleClearProducts}>Clear Products</button>
      <br></br>
      <button onClick={handleReleaseBasket}>Release Basket</button>
      <br></br>
    </div>
  );
};

export default AdminPage;
