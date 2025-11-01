const mongoose = require('mongoose');


const blogSchma = new mongoose.Schema({



    _id: mongoose.Schema.Types.ObjectId,

    Userid: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    imageurl: {
        type: String,
        required: true
    },

    categorytitle: {
        type: String,
        required: true
    },

    categoryId: {
        type: String,
        required: true
    },

    blogDetail: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const Blog = mongoose.model('blog', blogSchma);
module.exports = Blog;