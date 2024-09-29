'use client';
import React from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddBrand = ({ isOpen, onClose, initialValues, isEditMode, fetchBrands }) => {
  // Formik setup with enableReinitialize to reinitialize form when initialValues change
  const formik = useFormik({
    enableReinitialize: true, // Allows Formik to update when initialValues change
    initialValues: initialValues || {
      brandName: '',
      description: '',
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required('Please enter brand name'),
      description: Yup.string().required('Please enter description'),
    }),
    validateOnChange: false, // Optional: Disable validation on change
    validateOnBlur: true, // Optional: Validate on blur
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditMode && initialValues._id) { // Check if initialValues.id exists
          // Update existing brand using PUT request
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/brand/${initialValues._id}`, {
            brandName: values.brandName,
            description: values.description,
          });
          toast.success('Brand updated successfully');
        } else if (!isEditMode) {
          // Add new brand using POST request
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/registerbrand`, values);
          toast.success('Brand added successfully');
        } else {
          toast.error('Invalid brand ID');
        }
        resetForm(); // Clear form fields
        fetchBrands(); // Refresh brands list after submission
        onClose(); // Close the modal after submission
      } catch (error) {
        toast.error('Error submitting brand');
        console.error('Error submitting brand', error); // Log error for debugging
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle className='font-bold'>
        {isEditMode ? 'Edit Brand' : 'Add Brand'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="brandName"
                label="Brand Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('brandName')}
                error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                helperText={formik.touched.brandName && formik.errors.brandName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...formik.getFieldProps('description')}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {isEditMode ? 'Update Brand' : 'Add Brand'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBrand;
