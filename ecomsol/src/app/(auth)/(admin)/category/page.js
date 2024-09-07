'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, IconButton, Menu, MenuItem, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the View icon
import axios from 'axios';

const CategoriesDataTable = () => {
  const [categories, setCategories] = useState([]); // Initialize categories as an empty array
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch categories data when the component mounts

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    useEffect(() => {
         fetchCategories();
    }, []); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    handleClose();
  };

  const handleView = () => {
    console.log('View clicked');
    handleClose();
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className='font-bold' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Category List
        </Typography>
        <Link href="/category/addcategory" underline="none">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Category
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>        
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}> {/* Use the primary color for the background */}
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Category Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Created Date</TableCell> 
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>          
          </TableHead>
          <TableBody>
            {categories.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu className='shadow-sm'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <MenuItem onClick={handleView}>
                      <VisibilityIcon fontSize="small" style={{ marginRight: '10px' }} />
                      View
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                      <EditIcon fontSize="small" style={{ marginRight: '10px' }} />
                      Update
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <DeleteIcon fontSize="small" style={{ marginRight: '10px' }} />
                      Delete
                    </MenuItem>                  
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoriesDataTable;
