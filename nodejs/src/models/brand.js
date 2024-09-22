const mongoose  = require("mongoose");

const Brand = mongoose.model('Brand', {
    brandName: String,
    description: String,
    brandImage: String,
    isActive: Boolean,
    createDate:Date,
    createdBy:String,
    modifiedBy:String,
    modifiedDate:Date

});

module.exports = Brand;