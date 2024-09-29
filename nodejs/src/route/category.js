const { Router } = require('express');
const {getAllCategory, getCategoryById, registerCategory, updateCategoryById,
     deleteCategoryById} = require('../controllers/category')

const CategoryRoute = Router();

// get all categories
CategoryRoute.get('/categories', getAllCategory);

// get Category by ID
CategoryRoute.get('/categories/:id', getCategoryById);

// register a new category
CategoryRoute.post('/registercategories', registerCategory);

// update a category
CategoryRoute.put('/categories/:id', updateCategoryById);
// delete category by id
CategoryRoute.delete('/categories/:id', deleteCategoryById)

module.exports = CategoryRoute;
