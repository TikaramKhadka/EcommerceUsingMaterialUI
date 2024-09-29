const { Router } = require('express');

const { getAllBrand, getBrandById, registerBrand, updateBrandById, deleteBrandById } = require('../controllers/brand');

const BrandRoute = Router();

// get all brands
BrandRoute.get('/brands', getAllBrand);

// get brand by ID
BrandRoute.get('/brands/:id', getBrandById);

// register a new brand
BrandRoute.post('/registerbrands', registerBrand);

// update a brand
BrandRoute.put('/brands/:id', updateBrandById);
// delete brand by id
BrandRoute.delete('/brands/:id', deleteBrandById)

module.exports = BrandRoute;