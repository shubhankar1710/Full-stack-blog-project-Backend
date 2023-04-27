require('dotenv').config();
const express = require("express");
const session= require('express-session');
 const MongoStore=require("connect-mongo");
const globalerrHandler = require('./middlewares/globalHandler');
const commentRoutes = require('./routes/comments/comment');
const postRoutes = require('./routes/posts/posts');
const userRoutes = require("./routes/users/users");
require('dotenv').config();

require('./config/dbconnect');

const app = express();
app.use(express.json());
//middlewares
//----
//configuer ejs
app.set('view engine','ejs');
// serve static file
app.use(express.static(__dirname +'/public'));
//  render
app.get('/',(req,res)=>{
    res.render('index');
});


app.use(express.json())//pass incoming data
// session configuaration
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:true,
    // store: new MongoStore({
    //     mongoUrl: process.env.MONGO_URL,
    //     ttl: 24 * 60 * 60, //1 day
    //   }),
        
})
);
//routes
//user route
app.use('/api/v1/user',userRoutes);
//----






//post route
app.use('/api/v1/posts',postRoutes);
//Post/api/v1/posts




//comment route
app.use('/api/v1/comments',commentRoutes);
//Post/api/v1/comments





//Error handler middlewares
app.use(globalerrHandler);
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Servver is running on PORT ${PORT}`));

//Natsudragneel
