const  mongoose  = require("mongoose");

const Product = mongoose.model('Product', {
    productName: String,
    price:String,
    quantity:Number,
    description: String,
    categoryId: String,
    productImage:String,
    createdDate:Date,
    createdBy:String,
    modifiedDate:Date,
    modifiedBy:Date,
    isActive: Boolean
})

module.exports = Product;