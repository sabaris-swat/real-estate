import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
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
        <ConditionalButtons />
        <Routes>
          <Route path="/" element={<Navigate to={loggedInUser ? (loggedInUser.role === 'buyer' ? '/buyer' : '/seller') : '/login'} />} />
          <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* <Route path="/buyer" element={loggedInUser && loggedInUser.role === 'buyer' ? <BuyerPage /> : <Navigate to="/login" />} /> */}
          <Route path="/buyer" element={<BuyerPage />} />
          <Route path="/seller" element={<SellerPage />} />

          {/* <Route path="/seller" element={loggedInUser && loggedInUser.role === 'seller' ? <SellerPage /> : <Navigate to="/login" />} /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

function ConditionalButtons() {
  const location = useLocation();
  const isLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup';

  return (
    isLoginOrSignup && (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/signup">
          Signup
        </Button>
      </Box>
    )
  );
}

export default App;
