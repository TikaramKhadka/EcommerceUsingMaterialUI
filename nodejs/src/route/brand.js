const { Router } = require('express');

const { getAllBrand, getBrandById, registerBrand, updateBrandById, deleteBrandById } = require('../controllers/brand');

const BrandRoute = Router();

// get all categories
BrandRoute.get('/brand', getAllBrand);

// get Category by ID
CategoryRoute.get('/category/:id', getBrandById);

// register a new category
CategoryRoute.post('/registercategory', registerBrand);

// update a category
CategoryRoute.put('/category/:id', updateBrandById);
// delete category by id
CategoryRoute.delete('/category/:id', deleteBrandById)

module.exports = BrandRoute;