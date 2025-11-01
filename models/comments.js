const mongoose = require('mongoose');


const commentSchma = new mongoose.Schema({



    _id: mongoose.Schema.Types.ObjectId,

    Userid: {
        type: String,
        required: true
    },


    userName: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },


    blogId: {
        type: String,
        required: true
    },

})

const Comment = mongoose.model('comment', commentSchma);
module.exports = Comment;