'use client';
import React from 'react';
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddCategory = ({ isOpen, onClose, initialValues, isEditMode, fetchCategories }) => {
  // Formik setup with enableReinitialize to reinitialize form when initialValues change
  const formik = useFormik({
    enableReinitialize: true, // Allows Formik to update when initialValues change
    initialValues: initialValues || {
      categoryName: '',
      brandName: '',
      description: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Please enter category name'),
      brandName: Yup.string().required('Please enter brand name'),
      description: Yup.string().required('Please enter description'),
    }),
    validateOnChange: true, // Disable validation on change
    validateOnBlur: true, // Disable validation on blur
    onSubmit: async (values, { resetForm, setTouched }) => {
      // Manually set all fields as touched
      setTouched({
        categoryName: true,
        brandName: false,
        description: true,
      });

      // Trigger validation
      formik.validateForm().then(async (errors) => {
        if (Object.keys(errors).length === 0) { // No errors
          try {
            if (isEditMode) {
              // Update existing category  
              debugger
              console.log(values)           
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/category/${initialValues.id}`, values);
              toast.success('Category updated successfully');
            } else {
              // Add new category
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/regustercategory/`, values);
              toast.success('Category added successfully');
            }
            resetForm();
            fetchCategories(); // Refresh categories list
            onClose(); // Close the modal after submission
          } catch (error) {
            toast.error('Error submitting category');
          }
        } else {
          // Set form errors manually if any
          formik.setErrors(errors);
        }
      });
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-title"
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('categoryName')}
                error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                helperText={formik.touched.categoryName && formik.errors.categoryName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-brand"
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
                id="outlined-description"
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
            {isEditMode ? 'Update Category' : 'Add Category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCategory;
