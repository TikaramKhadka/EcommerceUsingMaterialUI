'use client'
import { useState } from 'react';
import { Card, CardActions, CardContent, TextField, Button, Grid } from '@mui/material';
import React from 'react';

const AddCategory = () => {
  // State for managing input values and errors
  const [categoryname, setCategoryname] = useState('');
  const [brandname, setBrandname] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    categoryname: false,
    brandname: false,
    description: false,
  });

  // Handler for Category Name input change
  const handleCategoryNameChange = (e) => {
    setCategoryname(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, categoryname: false }));
    }
  };

  // Handler for Brand Name input change
  const handleBrandChange = (e) => {
    setBrandname(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, brandname: false }));
    }
  };

  // Handler for Description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, description: false }));
    }
  };

  // Handler for form submission
  const handleSubmit = () => {
    const categorynameError = categoryname.trim() === '';
    const brandnameError = brandname.trim() === '';
    const descriptionError = description.trim() === '';

    const newErrors = {
      categoryname: categorynameError,
      brandname: brandnameError,
      description: descriptionError,
    };
    setErrors(newErrors);

    if (!categorynameError && !brandnameError && !descriptionError) {
      console.log('Category added successfully!');
    }
  };

  return (
    <div className="flex w-full h-full">       
      <Card className="flex flex-col items-center  bg-white shadow-lg shadow-gray-300 hover:shadow-xl">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-categoryname"
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={categoryname}
                onChange={handleCategoryNameChange}
                error={errors.categoryname}
                helperText={errors.categoryname ? 'Please enter category name' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-brand"
                label="Brand Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={brandname}
                onChange={handleBrandChange}
                error={errors.brandname}
                helperText={errors.brandname ? 'Please enter brand name' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-description"
                label="Descriptions"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4} // Makes it a textarea
                value={description}
                onChange={handleDescriptionChange}
                error={errors.description}
                helperText={errors.description ? 'Please enter description' : ''}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-start', width: '100%' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add Category
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AddCategory;
