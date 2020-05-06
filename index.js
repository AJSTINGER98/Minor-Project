//Import all npm modules
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");


//Set ejs as default viewing template
app.set("view engine", "ejs");


const mongoURI = 'mongodb://localhost:27017/mydb';

//Connect to database
mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);





//Import models
const supervisor = require("./models/supervisor");


//Add default directories
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Utilities"));
app.set('views', path.join(__dirname, 'views'));


//method-override to implement RESTful Routing
app.use(methodOverride("_method"));

//Enable body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));





//Import routes
const supRoute = require("./routes/supervisor");
const dashRoute = require("./routes/dashboard");
const formRoute = require("./routes/form");


//Call all the routes
app.use("/supervisor",supRoute);
app.use("/",dashRoute);
app.use("/",formRoute);

// Profile Route
app.get("/profile",function(req,res){
    res.render("profile");
})


//Decide the port of website
app.listen(process.env.port||3000,()=>{
    console.log('Running');
});