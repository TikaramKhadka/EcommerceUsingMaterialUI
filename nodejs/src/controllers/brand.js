const Brand = require('../models/brand')

// get all brand
const getAllBrand = async (req, res) => {
    try {
        const data = await Brand.find();
        res.json(data);
    } catch (error) {
        res.status(404).json({ msg: "Data not found", error });
    }
}

// get brand by Id
const getBrandById = async (req, res) => {
    try {
        const data = await Brand.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} brand not found` });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching brand", error });
    }
}

// register new brand
const registerBrand = async (req, res) => {
    try {
        const brandExist = await Brand.exists({ brandName: req.body.brandName });
        if (brandExist) {
            return res.status(404).json({ msg: "brand already exists" });
        }
        const newBrand = await Brand.create(req.body);
        res.status(201).json({ msg: "Brand added successfully", newBrand });
    } catch (error) {
        res.sendStatus(500).send({ msg: 'Error registering brand'});
    }
}

// update brand by id
const updateBrandById = async (req, res) => {
    try {
        const data = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ msg: 'brand not found' });
        }
        res.status(201).json({ msg: `${req.params.id} brand updated successfully`, data });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating brand'});
    }
}
// delete brand by id
const deleteBrandById = async (req,res)=>{
    try {
        var data = category.findByIdAndDelete(req.params.id)  
        if (!data) {
            return res.status(404).json({ msg: `${req.params.id} brand not found` });            
        }  
        res.status(201).json({ msg: `${req.params.id} brand deleted successfully` });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting brand"});
    }
   
}


module.exports = {getAllBrand, getBrandById, registerBrand, updateBrandById, deleteBrandById}