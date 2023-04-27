const mongoose = require('mongoose');

//title,desc,category,image
const postschema= new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        description:{
            type:String,
            required: true,
        },
        category:{
            type:String,
            required: true,
            enum :["reactjs","html","css","node js","javascript","other"],
        },
        image:{
            type:String,
            //required: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        Comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            },
        ]
    },
);
//schema compile
const Post=mongoose.model('Post',postschema);

//export model
module.exports=Post;