import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
      
      localStorage.setItem("loggedInUser", JSON.stringify({ email: user.email, name: user.name, role: user.role, phone: user.phone }));
      
      if (user.role === 'buyer') {
        navigate('/buyer');
      } else if (user.role === 'seller') {
        navigate('/seller');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <>
    
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField label="Email" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
    </>
  );
};

export default LoginForm;
