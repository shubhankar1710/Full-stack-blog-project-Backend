const express = require('express');
const res = require('express/lib/response');
const multer=require('multer');
const storage = require('../../config/cloudinary');
const { registerCtrl, loginctrl, userDetailsctrl, userprofilectrl, userprofileimagectrl, usercoverimagectrl, passworduptctrl, updateuserctrl, logoutctrl } = require('../../controllers/users/user');

const protected=require('../../middlewares/protected');

const userRoutes= express.Router();
//instance of multer
const upload=multer({storage});
//rendering forms
//----
userRoutes.get('/register',(req,res)=>{
    res.render('users/register');
});
userRoutes.get('/login',(req,res)=>{
    res.render('users/login');
});
userRoutes.get('/profile-page',(req,res)=>{
    res.render('users/profile');
});
//upload photo
userRoutes.get('/profile-photo-upload',(req,res)=>{
    res.render('users/uploadProfilePhoto');
});
//cover photo
userRoutes.get('/cover-photo-upload',(req,res)=>{
    res.render('users/uploadCoverPhoto');
});

//Post/api/v1/user/register
userRoutes.post('/register',registerCtrl);

//Post/api/v1/user/login
userRoutes.post('/login',loginctrl);
//GET/api/v1/user/:ID

//GET/api/v1/user/profile/:ID
userRoutes.get('/profile',protected,userprofilectrl);
//profile image
userRoutes.put('/profile-photo-upload/',userprofileimagectrl);
//cover image
userRoutes.put('/cover-photo-upload/',usercoverimagectrl);
//update password
userRoutes.put('/update-password/:id',passworduptctrl);
//update user 
userRoutes.put('/update/:id',updateuserctrl);
userRoutes.get('/:id',userDetailsctrl);

//logout
userRoutes.get('/logout',logoutctrl);

module.exports=userRoutes;