const Category = require('../models/category')

// get all categories
const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send({ msg: "Data not found", error });
    }
}

// get category by Id
const getCategoryById = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);
        if (!data) {
            return res.status(404).send({ msg: `${req.params.id} Category not found` });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ msg: "Error fetching category", error });
    }
}

// register new category
const registerCategory = async (req, res) => {
    try {
        const categoryExist = await Category.exists({ categoryName: req.body.categoryName });
        if (categoryExist) {
            return res.status(404).send({ msg: "Category already exists" });
        }
        const newCategory = await Category.create(req.body);
        res.status(201).send({ msg: "Category added successfully", newCategory });
    } catch (error) {
        res.status(500).send({ msg: 'Error registering category', error });
    }
}

// update category by id
const updateCategoryById = async (req, res) => {
    try {
        const data = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!data) {
            return res.status(404).send({ msg: 'Category not found' });
        }
        res.status(201).send({ msg: `${req.params.id} category updated successfully`, data });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating category', error });
    }
}
// delete category by id
const deleteCategoryById = async (req,res)=>{
    try {
        var data = category.findByIdAndDelete(req.params.id)  
        if (!data) {
            return res.status(404).send({ msg: `${req.params.id} category not found` });            
        }  
        res.status(201).send({ msg: `${req.params.id} category deleted successfully` });
    } catch (error) {
        res.status(500).send({ msg: "something went wrong"});
    }
   
}


module.exports = {getAllCategory, getCategoryById, registerCategory, updateCategoryById, deleteCategoryById}