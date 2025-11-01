const mongoose = require('mongoose');


const categorySchma = new mongoose.Schema({



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
    }
})

const Category = mongoose.model('category', categorySchma);
module.exports = Category;