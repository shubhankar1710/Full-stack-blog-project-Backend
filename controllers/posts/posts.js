const User=require("../../models/user/user");
const Post=require("../../models/post/Post");

const appErr=require("../../utils//appErr")

//create
const createPostCtrl = async (req, res,next) => {
  console.log(req.file);
  console.log(req.body);
  const { title,description,category,user,}=req.body;
  try {
    if(!title||!description||!category){
     return next(appErr("All fields are needed"));
    }
   const userId=req.session.userAuth;
   const userFound=await User.findById(userId);
   const postCreated=await Post.create({
     title,
     description,category,
     user:userFound._id,
    //  image:req.file.path,
   });
   //push post
   userFound.posts.push(postCreated._id);
   //resave
   await userFound.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//all
const fetchPostsCtrl = async (req, res,next) => {
  try {
    const posts=await Post.find().populate("Comments");
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//details
const fetchPostCtrl = async (req, res,next) => {
  try {
    //get the id from params
    const id=req.params.id;
    //find the post
    const post=await Post.findById(id).populate("Comments");
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//delete
const deletePostCtrl = async (req, res,next) => {
  try {
   //find the post
   const post=await Post.findById(req.params.id);
   //check if post belongs to user
   if(post.user.toString()!==req.session.userAuth.toString()){
     return next(appErr("you are not allowed to delete the post",403));
   }


    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//update
const updatepostCtrl = async (req, res,next) => {
  const{title,description,category}=req.body;

  try {
    //find the post
   const post=await Post.findById(req.params.id);
   //check if post belongs to user
   if(post.user.toString()!==req.session.userAuth.toString()){
     return next(appErr("you are not allowed to update the post",403));
   }
   //update the post
   const postUpdated=await Post.findByIdAndUpdate(req.params.id,{
     title,description,category
   },{
     new:true,
   });


    res.json({
      status: "success",
      data: postUpdated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  deletePostCtrl,
  updatepostCtrl,
};
