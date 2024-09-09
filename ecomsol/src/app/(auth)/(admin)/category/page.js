'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, IconButton, Menu, MenuItem, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import toast from 'react-hot-toast';

const CategoriesDataTable = () => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // Track the selected category

  // Fetch categories data when the component mounts
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id); // Set the selected category ID
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null); // Clear selected category when menu closes
  };

  const handleEdit = async (id) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
      toast.success('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    } finally {
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    try {    
      debugger  
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
      toast.success('Category deleted successfully');
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    } finally {      
      handleClose();
      fetchCategories();
    }
  };

  const handleView = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
      console.log('Category details:', data);     
    } catch (error) {
      console.error('Error viewing category:', error);
      toast.error('Failed to view category');
    } finally {
      handleClose();
    }
  };
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            <TableRow style={{ backgroundColor: '#1976d2' }}>
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
                  <IconButton onClick={(event) => handleClick(event, item.id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    className="shadow-sm"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && selectedId === item.id)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <MenuItem onClick={() => handleView(item.id)}>
                      <VisibilityIcon fontSize="small" style={{ marginRight: '10px' }} />
                      View
                    </MenuItem>
                    <MenuItem onClick={() => handleEdit(item.id)}>
                      <EditIcon fontSize="small" style={{ marginRight: '10px' }} />
                      Update
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(item.id)}>
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
