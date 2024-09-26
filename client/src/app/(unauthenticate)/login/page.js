'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Card, CardMedia, CardContent, CardActions, Button, Link } from '@mui/material';
import axios from 'axios';

const Login = () => {
  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Handler for form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values);
      console.log('Form submitted successfully!', data);
      // Perform any actions upon successful login, e.g., store token or redirect
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (e.g., show error message to the user)
    } finally {
      setSubmitting(false);
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
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      as={TextField}
                      id="outlined-email"
                      label="Email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!ErrorMessage.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Field
                      as={TextField}
                      id="outlined-password"
                      label="Password"
                      name="password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      margin="normal"
                      error={!!ErrorMessage.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </div>
                  <CardActions>
                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </CardContent>
          <p className="m-4">
            Don't have an account yet? <Link href="/register">Register</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
