const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({



    _id: mongoose.Schema.Types.ObjectId,

    name:{
        type: String,
        required:true

    },

    age: {
        type : String,
      
    },


    email:{

        type:String,
        required:true,
        unique:true
    },

     password :{
        type : String,
        required:true
    },

})



const User = mongoose.model('user',userSchema)
module.exports = User;