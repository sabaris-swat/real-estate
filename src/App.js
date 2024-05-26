import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import { Container, Tabs, Tab, Box } from '@mui/material';
import LoginForm from './components/login';
import SignupForm from './components/signup';
import BuyerPage from './components/buyer';
import SellerPage from './components/sellerproperty';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  return (
    
    <Router>
      <Container>
      <ConditionalTabs />
        <Routes>
          <Route path="/" element={<Navigate to={loggedInUser ? (loggedInUser.role === 'buyer' ? '/buyer' : '/seller') : '/login'} />} />
          <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/buyer" element={loggedInUser && loggedInUser.role === 'buyer' ? <BuyerPage /> : <Navigate to="/login" />} />
          <Route path="/seller" element={loggedInUser && loggedInUser.role === 'seller' ? <SellerPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        
      </Container>
    </Router>
  );
}

function ConditionalTabs() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup';

  return (
    isLoginOrSignup && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Tabs>
          <Tab label="Login" component={Link} to="/login" />
          <Tab label="Signup" component={Link} to="/signup" />
        </Tabs>
      </Box>
    )
  );
}

export default App;
