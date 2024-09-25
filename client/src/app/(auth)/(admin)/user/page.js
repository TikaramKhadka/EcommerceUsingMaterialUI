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

const UserDataTable = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // Track the selected category

  // Fetch users data when the component mounts
  const fetchUsers = async () => {
    try {
      debugger;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
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
      const { data } = await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating users:', error);
      toast.error('Failed to update users');
    } finally {
      fetchUsers();
      handleClose();
    }
  };

  const handleDelete = async (id) => {
    try {    
      debugger  
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh users after deletion
    } catch (error) {
      console.error('Error deleting users:', error);
      toast.error('Failed to delete users');
    } finally {      
      fetchUsers();
      handleClose();
    }
  };

  const handleView = async (id) => {
    try {
      const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
      console.log('User details:', data);     
    } catch (error) {
      console.error('Error viewing users:', error);
      toast.error('Failed to view users');
    } finally {
      fetchUsers()
      handleClose();
    }
  };
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User List
        </Typography>
        <Link href="/category/addcategory" underline="none">
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add User
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>User Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Created Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
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

export default UserDataTable;
