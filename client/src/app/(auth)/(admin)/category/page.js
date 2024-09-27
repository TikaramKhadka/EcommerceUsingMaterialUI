'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddCategory from './addcategory/page';

const CategoriesDataTable = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditData(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCategoryClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryToDelete}`);
      toast.success('Category deleted successfully');
      setDeleteDialogOpen(false); 
      fetchCategories(); 
    } catch (error) {
      console.error('Error deleting category:', error.response ? error.response.data : error.message);
      toast.error('Error deleting category');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Category List
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Category Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Created By</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>             
                <TableCell>{item.categoryName}</TableCell>
              <TableCell TableCell>admin</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditCategory(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCategoryClick(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Custom Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
          {/* Rows per page on the left */}
          <TablePagination
    component="div"
    count={categories.length}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[5, 10, 20]}
    labelRowsPerPage="Rows per page:"
    showFirstButton={false}  // Hide the first page button
    showLastButton={false}    // Hide the last page button
    nextIconButtonProps={{ style: { display: 'none' } }} // Hide next button
    backIconButtonProps={{ style: { display: 'none' } }} // Hide previous button
    labelDisplayedRows={() => null} // Hide the row display text
    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
  />

          {/* Pagination buttons (previous, next) on the right */}
          <Box display="flex" alignItems="center">
            <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(categories.length / rowsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={(e) => handleChangePage(e, i)}
                variant={page === i ? 'contained' : 'outlined'}
                sx={{ marginX: 0.5 }} 
              >
                {i + 1}
              </Button>
            ))}
            <Button onClick={(e) => handleChangePage(e, page + 1)} disabled={page >= Math.ceil(categories.length / rowsPerPage) - 1}>
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>

      {/* AddCategory Modal for Add/Edit */}
      <AddCategory
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialValues={editData}
        isEditMode={!!editData}
        fetchCategories={fetchCategories}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCategory} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoriesDataTable;
