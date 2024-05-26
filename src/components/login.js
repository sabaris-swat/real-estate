import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError(null);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

  
    if (!email.endsWith('@gmail.com')) {
      setError('Please use a Gmail account');
      return;
    }

    const userJSON = localStorage.getItem(email);
    console.log('userJSON',userJSON);
    if (!userJSON) {
      setError('User not found');
      return;
    }

    const user = JSON.parse(userJSON);
    console.log('user',user);
    if (user.password === password) {
      console.log('Login successful');
      localStorage.setItem("loggedInUser", JSON.stringify({ email: user.email, name: user.name, role: user.role, phone: user.phone }));

      if (user.role === 'buyer') {
        console.log('Logged in as buyer');
        navigate('/buyer');
      } else if (user.role === 'seller') {
        console.log('Logged in as seller');
        navigate('/seller');
      } else {
        console.log('Error');
      }
    } else {
      console.error('Invalid email or password');
      setError('Invalid email or password');
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }}
        autoComplete="off" 
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null);
        }}
        autoComplete="off" 
      />
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
