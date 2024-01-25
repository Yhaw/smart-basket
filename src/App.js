import React, { useState } from 'react';
import UserContext from './pages/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login/login';
import Scan from './pages/scan/scan';
import Cart from './pages/cart/cart';
import { ProjectProvider } from './ProjectContext';
import AdminPage from './pages/Admin/admin';
import CheckoutPage from './pages/checkout/checkout';
import FinalPage from './pages/Final/final';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <Router>
      <UserContext.Provider value={{ userId, setUserId }}>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/final" element={<FinalPage/>} />



            {/* <Route path="/propage" element={<Propage />} />
            <Route path="/field" element={<Field/>} />
            <Route path="/training" element={<Training/>} />
            <Route exact path="/projects/:projectId" element={<Project/>} /> */}


          </Routes>
        </ProjectProvider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
