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
import VisibilityIcon from '@mui/icons-material/Visibility';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddBrand from './addbrand/page'; // New AddBrand component

const BrandsDataTable = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`);
      console.log(response.data); // Log the response to check its structure
      if (Array.isArray(response.data)) {
        setBrands(response.data);
      } else {
        console.error('Expected an array but received:', response.data);
        toast.error('Failed to fetch brands: data is not an array');
        setBrands([]); // Reset to empty array if not an array
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to fetch brands');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleAddBrand = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand) => {
    setEditData(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteBrand = (brandId) => {
    setBrandToDelete(brandId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBrand = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/brands/${brandToDelete}`);
      toast.success('Brand deleted successfully');
      setDeleteDialogOpen(false);
      fetchBrands();
    } catch (error) {
      console.error('Error deleting brand:', error.response ? error.response.data : error.message);
      toast.error('Error deleting brand');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBrandToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBrands = Array.isArray(brands)
    ? brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={2}>
        <Typography className="font-bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Brand List
        </Typography>
        <TextField
          label="Search Brand"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2 }} // Adjust space
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddBrand}>
          Add Brand
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#1976d2' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SN</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Brand Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{item.brandName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditBrand(item)}>
                    <EditIcon sx={{ color: '#1976d2' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBrand(item._id)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                  <IconButton onClick={() => console.log('View brand:', item._id)}>
                    <VisibilityIcon sx={{ color: '#1976d2' }} />
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
            count={filteredBrands.length}
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
           {/* Total number of brands */}           
          <Typography variant="body2" sx={{ marginLeft: 2 }}>
            Total records: {brands.length}
          </Typography>
          </Box>
   
          {/* Pagination buttons */}
          <Box display="flex" alignItems="center">
            <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(filteredBrands.length / rowsPerPage) }, (_, i) => (
              <Button
                key={i}
                onClick={(e) => handleChangePage(e, i)}
                variant={page === i ? 'contained' : 'outlined'}
                sx={{ marginX: 0.3}}
              >
                {i + 1}
              </Button>
            ))}
            <Button onClick={(e) => handleChangePage(e, page + 1)} disabled={page >= Math.ceil(filteredBrands.length / rowsPerPage) - 1}>
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>

      {/* AddBrand Modal for Add/Edit */}
      <AddBrand
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialValues={editData}
        isEditMode={!!editData}
        fetchBrands={fetchBrands}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this brand?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteBrand} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrandsDataTable;
