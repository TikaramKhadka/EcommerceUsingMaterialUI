const { Router } = require('express');

const { getAllBrand, getBrandById, registerBrand, updateBrandById, deleteBrandById } = require('../controllers/brand');

const BrandRoute = Router();

// get all brands
BrandRoute.get('/brand', getAllBrand);

// get brand by ID
BrandRoute.get('/brand/:id', getBrandById);

// register a new brand
BrandRoute.post('/registerbrand', registerBrand);

// update a brand
BrandRoute.put('/brand/:id', updateBrandById);
// delete brand by id
BrandRoute.delete('/brand/:id', deleteBrandById)

module.exports = BrandRoute;