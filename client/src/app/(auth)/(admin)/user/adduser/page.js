'use client';
import React from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddSystemUser = ({ isOpen, onClose, initialValues, isEditMode, fetchUsers }) => {
  // Formik setup with enableReinitialize to reinitialize form when initialValues change
  const formik = useFormik({
    enableReinitialize: true, // Allows Formik to update when initialValues change
    initialValues: initialValues || {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Please enter full name'),
      email: Yup.string().email('Invalid email').required('Please enter email'),
      password: Yup.string().required('Please enter password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      phoneNumber: Yup.string().required('Please enter phone number'),
      address: Yup.string().required('Please enter address'),
    }),
    validateOnChange: false, // Optional: Disable validation on change
    validateOnBlur: true, // Optional: Validate on blur
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditMode && initialValues._id) { // Check if initialValues._id exists
          // Update existing user using PUT request
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${initialValues._id}`, values);
          toast.success('User updated successfully');
        } else if (!isEditMode) {
          // Add new user using POST request
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
          toast.success('User added successfully');
        } else {
          toast.error('Invalid user ID');
        }
        resetForm(); // Clear form fields
        fetchUsers(); // Refresh users list after submission
        onClose(); // Close the modal after submission
      } catch (error) {
        toast.error('Error submitting user');
        console.error('Error:', error);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle className='font-bold'>
        {isEditMode ? 'Edit User' : 'Add User'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="fullName"
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('fullName')}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('phoneNumber')}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('address')}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('confirmPassword')}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {isEditMode ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSystemUser;
