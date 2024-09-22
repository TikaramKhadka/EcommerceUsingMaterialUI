const Product = require('../models/product')

// get all Proudct
 const getAllProduct = async (req, res)=>{
    try {
        const data = await Product.Find();
        if(!data)
        {
            return res.status(404).send({msg:"products not found"});
        }
        else{
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(500).send({msg:"something went wrong"})
    }
}
// get category by product id
const getProductById =async(req, res)=>{
    try {
        var data = await Product.findById(req.params.id)
        if(!data)
            res.status(404).send({msg: `${req.params.id} product not found`})               
        esle 
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({msg:"something went wrong"})
    }
}
// get category by product id
const getProductByCategoryId =async(req, res)=>{
    try {
        var data = await Product.findById(req.params.categoryId)
        if(!data)
            res.status(404).send({msg: `${req.params.categoryId} product not found`})               
        esle 
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({msg:"something went wrong"})
    }
}
// register new product
const registerProduct =  async (req, res)=>{
    try {
        const productExist = await Product.exists({productName: req.body.productName})
        if(productExist){
            return res.status(201).send({msg:`${req.body.productName} already exist`});
        }
        const newProduct = await Product.create(req.body)
        res.status(201).send({msg: `${req.body.productName} added successfully`, newProduct});
    } catch (error) {
        res.status(500).send({msg:"something went wrong", error});
    }     
}
const updateProductById = async (req, res)=>{
    try {
        const data = Product.findByIdAndUpdate(req.params.id, req.body);
        if(!data){

            return res.status(404).send({msg:`${req.params.id} poduct not found`});
        }
        res.status(201).send({msg:`${req.params.id} updated successfully`, data});
    } catch (error) {
        res.status(500).send({msg:"something went worng"});
    }
}
const deleteProductById = async(req,res)=>{
    try {
        const data = Product.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send({msg:`${req.params.id} product not found`});
        }
        res.status(201).send({msg:`${req.params.id} product deleted successfully`});
    } catch (error) {
        res.status(500).send({msg:"something went wrong"});
    }
}

module.exports = {getAllProduct, getProductById, registerProduct, updateProductById, deleteProductById, getProductByCategoryId}