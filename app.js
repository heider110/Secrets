//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//LocalAuth 
const session = require('express-session');
const passport = require('passport');
const User = require("./models/user")
const auth=require("./models/passport");
const isAuth=require("./models/isAuthenticated");
//LocalAuth and for google
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

//LocalAuth and for google
app.use(session({
    secret: "type any thing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/",auth)
//-------




    
    
   
//-------end auth-----
// new connection and new database 
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true});


//TODO
app.get("/", function(req,res){
    res.render("home");
});





app.get("/secrets",isAuth.ensureAuthenticated, function(req,res){
    
    

    //to find all secret not equal null
    User.find({secret: {$ne: null}}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser){
                res.render("secrets", {userWithSecret:foundUser})
                console.log(foundUser.secret);
            } 
          
        }
    })
});

app.get("/submit",isAuth.ensureAuthenticated, function(req,res){
    
        res.render("submit")
     
});

app.post("/submit", function(req,res){
   const submittedSecret = req.body.secret;
   console.log(req.user);

   User.findById({_id:req.user._id}, function(err,foundUser){
    if (err){
        console.log(err);
    } else {
        if (foundUser){
            foundUser.secret = submittedSecret;
            foundUser.save(function(){
                res.redirect("/secrets")
            });
        }
    }
   })

});





app.listen(3000, function() {
  console.log("Server started on port 5000");
});