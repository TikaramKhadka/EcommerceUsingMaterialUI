'use client'
import { useState } from 'react';
import { TextField, Card, CardMedia, CardContent, CardActions, Button,Link } from '@mui/material';
import React from 'react';

const Login = () => {
  // State for managing the input values and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

 // Remove email error if input is valid
    if (emailRegex.test(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    }
  };
  // Handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    // Remove password error if input is not empty
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }
  };

  // Handler for form submission
  const handleSubmit = () => {
    // Validate email and password fields
    const emailError = !emailRegex.test(email);
    const passwordError = password.trim() === '';
    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    setErrors(newErrors);

    // Check if there are no errors before proceeding
    if (!emailError && !passwordError) {
      console.log('Form submitted successfully!');
      // Proceed with form submission (e.g., API call)
    }
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/image/bgimage.jpg")' }}>
      <div className="flex justify-center items-center h-full">
        <Card className="flex flex-col justify-center items-center w-[400px] bg-white shadow-sm">
          <CardMedia
            component="img"
            alt="Ecomsol"
            height="140"
            image="logo.png" // Replace with your logo path
          />
          <CardContent>
            <div>
              <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                error={errors.email}
                helperText={errors.email ? 'Please enter a valid email address' : ''}
              />
              <TextField
                id="outlined-password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                error={errors.password}
                helperText={errors.password ? 'Please enter your password' : ''}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Login
            </Button>
          </CardActions>
          <p className='m-4'>
            Don't have an account yet? <Link href="/register">Register</Link>
         </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
