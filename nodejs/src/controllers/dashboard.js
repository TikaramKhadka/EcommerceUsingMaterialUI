const Category = require('../models/category')
const Product = require('../models/product')
const User = require('../models/user')
const Brand = require('../models/brand')



// get user count
const getUserCount = async (req, res) => {
    try {
        const data = await User.countDocuments();
        console.log(data)
        res.status(200).send({count:data});
    } catch (error) {
        res.status(404).send({ msg: "Data not found", error });
    }
};
// get product count
const getProductCount = async (req, res) => {
    try {
        const data = await Product.countDocuments();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send({ msg: "Data not found", error });
    }
};
// get category count
const getCategoryCount = async (req, res) => {
    try {
        const data = await Category.countDocuments();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send({ msg: "Data not found", error });
    }
};

// get brand count
const getBrandCount = async (req, res) => {
    try {
        const data = await Brand.countDocuments();
        res.sendStatus(200).send(data);
    } catch (error) {
        res.sendStatus(404).send({ msg: "Data not found", error });
    }
};


module.exports ={getUserCount,getProductCount, getCategoryCount, getBrandCount}

