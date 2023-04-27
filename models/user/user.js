const mongoose = require('mongoose');
// schema
const userschema=new mongoose.Schema(
    {
        fullname: {
            type :String,
            required: true,
        },
        email:{
            type :String,
            required: true,
        },
        password:{
            type :String,
            required: true,
        },
        profileImage:{
          
            required: String,
        },
        coverImage:{
            required: String,
        },
        posts:[{type: mongoose.Schema.Types.ObjectId, ref:'Post'}],
        comments:[{type: mongoose.Schema.Types.ObjectId, ref:'comment'}],
    },
    {
        timestamp: true,
    }
);
// compile schema to form a model
const User= mongoose.model('user',userschema);
module.exports=User;