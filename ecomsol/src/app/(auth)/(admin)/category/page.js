'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the View icon

const CategoriesDataTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle Edit action
    console.log('Edit clicked');
    handleClose();
  };

  const handleDelete = () => {
    // Handle Delete action
    console.log('Delete clicked');
    handleClose();
  };

  const handleView = () => {
    // Handle View action
    console.log('View clicked');
    handleClose();
  };

  return (
    <div>
      {/* Container for title and button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography className='font-bold' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Category List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />} // Use the Add icon here
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Data 1</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>
                <IconButton onClick={handleClick}>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Data 1</TableCell>
              <TableCell>InActive</TableCell>
              <TableCell>
                <IconButton onClick={handleClick}>
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
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoriesDataTable;
