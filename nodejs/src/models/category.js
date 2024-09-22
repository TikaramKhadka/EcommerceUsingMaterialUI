const mongoose  = require("mongoose");

const Category = mongoose.model('Category', {
    categoryName: String,
    description: String,
    categoryImage: String,
    isActive: Boolean,
    createDate:Date,
    createdBy:String,
    modifiedBy:String,
    modifiedDate:Date

});

module.exports = Category;