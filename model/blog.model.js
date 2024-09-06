const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"   
    },
    blogImage : {
        type : String
    },
    blogTitle : {
        type : String,
        required : true
    },
    blogBody : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('blogs', blogSchema);