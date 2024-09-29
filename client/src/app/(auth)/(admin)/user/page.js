'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddSystemUser from './adduser/page';

const UsersDataTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    try {
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

  const handleAddUsers = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditUsers = (users) => {
    setEditData(users);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUsers = (userId) => {
    setUsersToDelete(userId);
    setDeleteDialogOpen(true);
  };
  const handleViewUsers = (userId) => {
    setUsersToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUsers = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${usersToDelete}`);
      toast.success('User deleted successfully');
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting users:', error.response ? error.response.data : error.message);
      toast.error('Error deleting users');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUsersToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((users) =>
    users.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Users List
        </Typography>
        {/* Search Bar */}
        <TextField
          label="Search User"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2 }} // Adjust space
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddUsers}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Created By</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>{item.fullName}</TableCell>              
                <TableCell>admin</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUsers(item)}>
                    <EditIcon sx={{ color: '#1976d2' }}/>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUsers(item._id)}>
                    <DeleteIcon  sx={{ color: 'red' }}/>
                  </IconButton>
                  <IconButton onClick={() => handleViewUsers(item._id)}>
                    <VisibilityIcon  sx={{ color: '#1976d2' }}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
         {/* Custom Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
          {/* Rows per page on the left */}
          <TablePagination
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Rows per page:"
            showFirstButton={false}
            showLastButton={false}
            nextIconButtonProps={{ style: { display: 'none' } }} 
            backIconButtonProps={{ style: { display: 'none' } }} 
            labelDisplayedRows={() => null} 
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
          />
           {/* Total number of users */}           
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            Total records: {users.length}
          </Typography>
          </Box>
   
          {/* Pagination buttons */}
          <Box display="flex" alignItems="center">
            <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(filteredUsers.length / rowsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={(e) => handleChangePage(e, i)}
                variant={page === i ? 'contained' : 'outlined'}
                sx={{ marginX: 0.3}}
              >
                {i + 1}
              </Button>
            ))}
            <Button onClick={(e) => handleChangePage(e, page + 1)} disabled={page >= Math.ceil(filteredUsers.length / rowsPerPage) - 1}>
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>

      {/* Add User Modal for Add/Edit */}
      <AddSystemUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialValues={editData}
        isEditMode={!!editData}
        fetchUsers={fetchUsers}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUsers} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersDataTable;
