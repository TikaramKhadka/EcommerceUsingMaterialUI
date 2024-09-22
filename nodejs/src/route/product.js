const Router = require('express');
const ProductRoute = Router();
const {getAllProduct, getProductById, registerProduct, updateProductById, 
    deleteProductById,getProductByCategoryId}=require('../controllers/product')
  
// Get all Products
    ProductRoute.get('/products', getAllProduct);
    // get product by Product Id
    ProductRoute.get('/products/:id', getProductById);
    // get product by category Id
    ProductRoute.get('/products/:id', getProductByCategoryId);
    // register Product
    ProductRoute.post('/registerproducts',registerProduct);
    //update product by id
    ProductRoute.put('/products/:id', updateProductById)
    //delete product by id
    ProductRoute.delete('/products/:id', deleteProductById)

    module.exports = ProductRoute;