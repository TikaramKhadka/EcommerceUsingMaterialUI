'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the View icon

const ProductDataTable = () => {
  const [productlist, setProduct] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      setProduct(response.data); // Set the data array
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked for:', selectedProduct);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked for:', selectedProduct);
    handleClose();
  };

  const handleView = () => {
    console.log('View clicked for:', selectedProduct);
    handleClose();
  };

  return (
    <div>
      {/* Container for title and button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className='font-bold' component="div" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary" // You can change the button color if needed, but 'primary' matches MUI's theme
          startIcon={<AddIcon />} // Use the Add icon here
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}> {/* Use the primary color for the background */}
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productlist.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, item)}>
                    <MoreVertIcon /> {/* Use the MoreVert icon here */}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditIcon fontSize="small" style={{ marginRight: '10px' }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <DeleteIcon fontSize="small" style={{ marginRight: '10px' }} />
                      Delete
                    </MenuItem>
                    <MenuItem onClick={handleView}>
                      <VisibilityIcon fontSize="small" style={{ marginRight: '10px' }} />
                      View
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

export default ProductDataTable;
