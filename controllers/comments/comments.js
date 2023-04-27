const Comment = require("../../models/comment/comment");
const Post = require("../../models/post/Post");
const User = require("../../models/user/user");
const appErr = require("../../utils/appErr");


//create
const createCommentCtrl = async (req, res,next) => {
  console.log(req.body);
  const {message}=req.body;
  try {
    //find post
    const post=await Post.findById(req.params.id);
    //create the comment
    const comment=await Comment.create({
      user:req.session.userAuth,
      message,
    });

    //find user
    post.Comments.push(comment._id);
    const user=await User.findById(req.session.userAuth);
    //push comment into user
    user.comments.push(comment._id);
    //disable
    //save
    await post.save({validateBeforeSave:false});
    await user.save({validateBeforeSave:false});
    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appErr(error));
  }
};

//single
const commentDetailsCtrl = async (req, res,next) => {
  try {
    res.json({
      status: "success",
      user: "Post comments",
    });
  } catch (error) {
    next(appErr(error));
  }
};

//delete
const deleteCommentCtrl = async (req, res,next) => {
  try {
    //find the post
   const comment=await Comment.findById(req.params.id);
   //check if post belongs to user
   if(comment.user.toString()!==req.session.userAuth.toString()){
     return next(appErr("you are not allowed to delete the comment,403"));
   }


    await Comment.findByIdAndDelete(req.params.id);




    res.json({
      status: "success",
      user: "comment has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error));
  }
};

//Update
const upddateCommentCtrl = async (req, res,next) => {
  try {
    const comment=await Comment.findById(req.params.id);
    if(!comment){
      return next(appErr("comment not found"));
    }
   //check if post belongs to user
   if(comment.user.toString()!==req.session.userAuth.toString()){
     return next(appErr("you are not allowed to update the comment",403));
   }
   //update the post
   const commentUpdated=await Comment.findByIdAndUpdate(req.params.id,{
     message:req.body.message,
   },{
     new:true,
   });


    res.json({
      status: "success",
      data: commentUpdated,
    });
  } catch (error) {
    next(appErr(error));
  }
};

module.exports = {
  createCommentCtrl,
  commentDetailsCtrl,
  deleteCommentCtrl,
  upddateCommentCtrl,
};
