const Product = require('../models/product')

// get all Proudct
 const getAllProduct = async (req, res)=>{
    try {       
        const data = await Product.find();    
        if(!data)
        {
            return res.sendStatus(404).send({msg:"products not found"});
        }
        else{
            res.send(data)
        }
    } catch (error) {
        res.sendStatus(500).send({msg:"something went wrong", error})
        console.log(error)
    }
}
// get category by product id
const getProductById = async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        if (!data) {
            return res.sendStatus(404).send({ msg: `${req.params.id} product not found` });
        }
        res.send(data);
    } catch (error) {
        res.sendStatus(500).send({ msg: "Something went wrong" });
    }
};
// get category by product id
const getProductByCategoryId = async (req, res) => {
    try {
        const data = await Product.findById({ categoryId: req.params.id }); // Assuming categoryId is part of the Product model
        if (!data) {
            return res.sendStatus(404).send({ msg: `${req.params.id} category not found` });
        }
        res.send(data);
    } catch (error) {
        res.sendStatus(500).send({ msg: "Something went wrong" });
    }
};


// register new product
const registerProduct =  async (req, res)=>{
    try {
        const productExist = await Product.exists({productName: req.body.productName})
        if(productExist){
            return res.sendStatus(201).send({msg:`${req.body.productName} already exist`});
        }
        const newProduct = await Product.create(req.body)
        res.sendStatus(201).send({msg: `${req.body.productName} added successfully`, newProduct});
    } catch (error) {
        res.sendStatus(500).send({msg:"something went wrong", error});
    }     
}
const updateProductById = async (req, res)=>{
    try {
        const data = Product.findByIdAndUpdate(req.params.id, req.body);
        if(!data){

            return res.sendStatus(404).send({msg:`${req.params.id} poduct not found`});
        }
        res.sendStatus(201).send({msg:`${req.params.id} updated successfully`, data});
    } catch (error) {
        res.sendStatus(500).send({msg:"something went worng"});
    }
}
const deleteProductById = async(req,res)=>{
    try {
        const data = Product.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.sendStatus(404).send({msg:`${req.params.id} product not found`});
        }
        res.sendStatus(201).send({msg:`${req.params.id} product deleted successfully`});
    } catch (error) {
        res.sendStatus(500).send({msg:"something went wrong"});
    }
}

module.exports = {getAllProduct, getProductById, registerProduct, updateProductById, deleteProductById, getProductByCategoryId}