const Category = require('../models/category')

// get all categories
const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find();
        res.json(data);
    } catch (error) {
        res.status(404).json({ msg: "Data not found", error });
    }
}

// get category by Id
const getCategoryById = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} Category not found` });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching category", error });
    }
}

// register new category
const registerCategory = async (req, res) => {
    try {     
      const categoryExist = await Category.exists({ categoryName: req.body.categoryName });
      if (categoryExist) {       
        return res.status(404).json({ msg: "Category already exists" });
      }      
      // Create new category
      const newCategory = await Category.create(req.body);     
      return res.status(201).json({ msg: "Category added successfully", newCategory });
    } catch (error) {     
      return res.status(500).json({ msg: 'Error registering category' });
    }
  };


const updateCategoryById = async (req, res) => {
    try {
        debugger
        const data = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(200).json({ msg: `${req.params.id} category updated successfully`, data });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating category', error });
    }
};

// delete category by id
const deleteCategoryById = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = {getAllCategory, getCategoryById, registerCategory, updateCategoryById, deleteCategoryById}