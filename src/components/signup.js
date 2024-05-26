import React, { useState } from 'react';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(value.length < 10 || value.length > 15);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || phoneError) {
      alert('Please correct the errors before submitting.');
      return;
    }
    const user = {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    };
    localStorage.setItem(email, JSON.stringify(user));
    alert('Signup successful');
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        helperText={emailError ? 'Email must be a valid @gmail.com address' : ''}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        error={phoneError}
        helperText={phoneError ? 'Phone number must be numeric and between 10-15 digits' : ''}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RadioGroup value={role} onChange={handleRoleChange} row sx={{ mt: 2 }}>
        <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
        <FormControlLabel value="seller" control={<Radio />} label="Seller" />
      </RadioGroup>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
