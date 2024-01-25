// LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';
import UserContext from '../UserContext';

import '../login/login.css';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

   
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('https://smart-backend-zs75.onrender.com/login', {
         method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      }
      
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log(data.message);
        setUserId(data.user_id); // Update the userId in the context
        navigate('/scan');
      } else {
        // Login failed
        setError(data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const goToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div>
      <header className="header">SMART CART</header>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-actions">
          <div className="login-button" onClick={handleLogin}>
            {loading ? <AiOutlineLoading className="loading-icon" /> : 'Login'}
          </div>
        </div>
        <br></br>
        <div className="login-actions">
          <div className="login-button" onClick={goToAdmin}>
            {loading ? <AiOutlineLoading className="loading-icon" /> : 'Admin'}
          </div>
        </div>
      </form>
      {error && (
        <div className="error-popup">
          <MdErrorOutline className="error-icon" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
