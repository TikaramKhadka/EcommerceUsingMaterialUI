const mongoose  = require("mongoose");

const User = mongoose.model('User', {
    fullName: String,
    dateOfBirth: String,
    address: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    phoneNumber: String,
    email: String,
    password: String,
    photo: String
});
module.exports = User;