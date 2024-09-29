'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
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
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the View icon
import toast from 'react-hot-toast';
import AddProduct from './addproduct/page';

const ProductDataTable = () => {
  const [productlist, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      setProduct(response.data); // Set the data array
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditData(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productToDelete}`);
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
  };

  // Filter products based on search term
  const filteredProducts = productlist.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Container for title and button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" component="div" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>
        <TextField
          label="Search Product"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddProduct}>
          Add product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditProduct(item)}>
                      <EditIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(item._id)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <IconButton onClick={() => console.log("View Product", item)}>
                      <VisibilityIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
          <Box display="flex" alignItems="center">
            {/* Rows per page on the left */}
            <TablePagination
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
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
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              Total records: {filteredProducts.length}
            </Typography>
          </Box>

          {/* Pagination buttons */}
          <Box display="flex" alignItems="center">
            <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(filteredProducts.length / rowsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={(e) => handleChangePage(e, i)}
                variant={page === i ? 'contained' : 'outlined'}
                sx={{ marginX: 0.3 }}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              onClick={(e) => handleChangePage(e, page + 1)}
              disabled={page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>

      {/* AddProduct Modal for Add/Edit */}
      <AddProduct
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialValues={editData}
        isEditMode={!!editData}
        fetchProducts={fetchProducts}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProduct} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDataTable;
