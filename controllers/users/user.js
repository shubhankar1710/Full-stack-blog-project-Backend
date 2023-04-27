const bcrypt= require('bcryptjs');
const User = require("../../models/user/user");
const appErr=require("../../utils/appErr");




const registerCtrl= async(req,res,next)=>{
    const {fullname,email,password}=req.body;
    //check is field is empty
    if(!fullname|| !email|| !password){
        return next(appErr("All Fields are required"));
    }
    try {
        //check if user exist email
        const userFound=await User.findOne({email});
        //throw error
        if(userFound){
            return next(appErr('User Already Exist'));
        }
        //hash password
        const salt=await bcrypt.genSalt(10);
        const passwordHash= await bcrypt.hash(password,salt);
        //register user
        const user=await User.create({
            fullname,
            email,
            password: passwordHash,
        });
        res.json({
            status:'success',
            data: user,

            

        });
    } catch (error) {
        res.json(error);
    }
};
//login
const loginctrl=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return next(appErr('Email and password field are required'));
    }

    try {
        const userFound=await User.findOne({email});
        if(!userFound){
            //throw error
            
                return next(appErr('Invalid login credentials'));
             }

        
        //very passsword
        const ispasswordvalid=await bcrypt.compare(password,userFound.password);
        if(!ispasswordvalid){
                return next(appErr('Invalid login password'));
             }
             //save the user in session
             req.session.userAuth=userFound._id;
             console.log(req.session);
        
        res.json({
            status:'success',
            data:userFound,

        });
    } catch (error) {
        res.json(error);
    }
};
// details
const userDetailsctrl=async(req,res)=>{
    try {
        // console.log(req.params);
        
        //get user id from params
        const userId=req.params.id;
        //find the user
        const user=await User.findById(userId);
        res.json({
            status:"success",
            data :user,

        });
    } catch (error) {
        res.json(error);
    }
};
//profile
const userprofilectrl=async(req,res)=>{
    try {
        //get login user
        const userID=req.session.userAuth;
        //find user
        const user=  await User.findById(userID).populate("posts").populate("comments");
        res.json({
            status:'success',
            data:user,

        });
    } catch (error) {
        res.json(error);
    }
};
const userprofileimagectrl=async(req,res)=>{
    try {
        res.json({
            status:'success',
            data:'profile photo successfully added',

        });
    } catch (error) {
        res.json(error);
    }
};
const usercoverimagectrl=async(req,res)=>{
    try {
        res.json({
            status:'success',
            data:'profile photo successfully added',

        });
    } catch (error) {
        res.json(error);
    }
};
const passworduptctrl=async(req,res,next)=>{
    const{password}=req.body;
    try {
        //Check if user is updating the password
        if(password){
            const salt=await bcrypt.genSalt(10);
            const passwordHash=await bcrypt.hash(password,salt);
              //update user
            await User.findByIdAndUpdate(req.params.id,{
                password:passwordHash,
            },{
                new:true,
            }
            );
        
              res.json({
                  status:'success',
                  user:'user password changed successfully',
      
              });
        }
      
       }
        
        catch (error) {
        return next(appErr("please provide password field"));
    }
};

const updateuserctrl = async (req, res, next) => {
    const { fullname, email } = req.body;
    try {
      //Check if email is not taken
      if (email) {
        const emailTaken = await User.findOne({ email });
        if (emailTaken) {
          return next(appErr("Email is taken", 400));
        }
      }
      //update the user
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          fullname,
          email,
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return(next(appErr(error.message)));
    }
  };
const logoutctrl=async(req,res)=>{
    try {
        res.json({
            status:'success',
            user:'user logout',

        });
    } catch (error) {
        res.json(error);
    }
}

module.exports= {
    registerCtrl,
    loginctrl,
    userDetailsctrl,
    userprofilectrl,
    userprofileimagectrl,
    usercoverimagectrl,
    passworduptctrl,
    updateuserctrl,
    logoutctrl,
};