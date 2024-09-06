const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    profileImage : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    lname : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    number : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('users', userSchema)