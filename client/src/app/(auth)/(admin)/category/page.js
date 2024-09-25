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
  const [categories, setCategories] = useState([]); // To store category data
  const [isModalOpen, setIsModalOpen] = useState(false); // For opening Add/Edit modal
  const [editData, setEditData] = useState(null); // For storing the category data in edit mode
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // For delete confirmation dialog
  const [categoryToDelete, setCategoryToDelete] = useState(null); // For storing the category to be deleted

  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Fetch categories data when the component mounts
  const fetchCategories = async () => {
    try {
      debugger;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component loads
  }, []);

  // Open the modal for adding a new category
  const handleAddCategory = () => {
    setEditData(null); // No data for add mode
    setIsModalOpen(true);
  };

  // Open the modal for editing a category
  const handleEditCategory = (category) => {
    setEditData(category); // Pass selected category data to edit mode
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Open the delete confirmation dialog
  const handleDeleteCategoryClick = (categoryId) => {
    setCategoryToDelete(categoryId); // Store the category to delete
    setDeleteDialogOpen(true); // Open the dialog
  };

  // Confirm the deletion
  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryToDelete}`);
      toast.success('Category deleted successfully');
      setDeleteDialogOpen(false); // Close the dialog
      fetchCategories(); // Refresh the category list after deletion
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  // Close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
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
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{item.categoryName}</TableCell> {/* Changed to title */}
                <TableCell>
                  {/* Edit Icon */}
                  <IconButton onClick={() => handleEditCategory(item)}>
                    <EditIcon />
                  </IconButton>
                  {/* Delete Icon */}
                  <IconButton onClick={() => handleDeleteCategoryClick(item.id)}>
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
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Rows per page:"
            showFirstButton
            showLastButton
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          />

          {/* Pagination buttons (previous, next) on the right */}
          <Box>
            <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(categories.length / rowsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={(e) => handleChangePage(e, i)}
                variant={page === i ? 'contained' : 'outlined'}
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
        isEditMode={!!editData} // true if there's editData
        fetchCategories={fetchCategories} // Pass down the refetch method
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
