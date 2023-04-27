const mongoose=require('mongoose');

//comment schema
const commentschema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'User',
        },
    message:{
        type:String,
        required: true,
    },
},
{
    timestamps: true,
}
);
//compile schema to form model
const Comment=mongoose.model('comment',commentschema);
module.exports=Comment;