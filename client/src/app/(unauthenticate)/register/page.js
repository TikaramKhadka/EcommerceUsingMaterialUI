'use client';
import { useState } from 'react';
import { TextField, Card, CardMedia, CardContent, CardActions, Button, Link } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import dayjs from 'dayjs';

const Register = () => {
  // State for managing the input values and errors
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [birthdate, setBirthdate] = useState(null); // State for DatePicker
  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmpassword: false,
    birthdate: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // At least 8 characters, 1 uppercase, 1 number, 1 special character

  // Handler for fullname input change
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: false }));
    }
  };

  // Handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: false }));
    }
  };

  // Handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordRegex.test(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }
  };

  // Handler for confirm password input change
  const handleConfirmpasswordChange = (e) => {
    setConfirmpassword(e.target.value);
    if (e.target.value === password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmpassword: false }));
    }
  };

  // Handler for DatePicker change
  const handleBirthdateChange = (newValue) => {
    setBirthdate(newValue);
    if (newValue) {
      setErrors((prevErrors) => ({ ...prevErrors, birthdate: false }));
    }
  };

  // Handler for form submission
  const handleSubmit = () => {
    const fullnameError = fullname.trim() === '';
    const emailError = !emailRegex.test(email);
    const passwordError = !passwordRegex.test(password);
    const confirmpasswordError = confirmpassword !== password;
    const birthdateError = birthdate === null;

    const newErrors = {
      fullname: fullnameError,
      email: emailError,
      password: passwordError,
      confirmpassword: confirmpasswordError,
      birthdate: birthdateError,
    };
    setErrors(newErrors);

    if (!fullnameError && !emailError && !passwordError && !confirmpasswordError && !birthdateError) {
      console.log('Form submitted successfully!');
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
            image="logo.png"
          />
          <CardContent>
            <div>
              <TextField
                id="outlined-fullname"
                label="Fullname"
                variant="outlined"
                fullWidth
                margin="normal"
                value={fullname}
                onChange={handleFullnameChange}
                error={errors.fullname}
                helperText={errors.fullname ? 'Please enter your fullname' : ''}
              />
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
              <LocalizationProvider   className='w-full'  dateAdapter={AdapterDayjs}>
                <DatePicker                
                  label="Date of Birth"
                   className='w-full'
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className='w-full'                   
                      fullWidth 
                      margin="normal"
                      error={errors.birthdate}
                      helperText={errors.birthdate ? 'Please select a date' : ''}
                    />
                  )}                
                />
              </LocalizationProvider>
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
                helperText={errors.password ? 'Password must be at least 8 characters long and include uppercase letters, numbers, and special characters' : ''}
              />
              <TextField
                id="outlined-confirmpassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={confirmpassword}
                onChange={handleConfirmpasswordChange}
                error={errors.confirmpassword}
                helperText={errors.confirmpassword ? 'Passwords do not match' : ''}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Register
            </Button>
          </CardActions>
          <p className="m-4">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
