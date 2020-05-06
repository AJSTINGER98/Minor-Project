//Import all npm modules
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");
// const autoIncrement = require('mongoose-auto-increment');



//Set ejs as default viewing template
app.set("view engine", "ejs");


//Connect to database
mongoose.connect("mongodb://localhost:27017/mydb",{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


//Import models
const supervisor = require("./models/supervisor");

//Auto Increment
// var connection = mongoose.createConnection("mongodb://localhost:27017/mydb",{ useNewUrlParser: true,useUnifiedTopology: true });
// autoIncrement.initialize(connection);

//Auto Increment Parameters
// supervisorSchema.plugin(autoIncrement.plugin, { model: "supervisor", field: "spID" });

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


//Call all the routes
app.use("/supervisor",supRoute);
app.use("/",dashRoute);

// Profile Route
app.get("/profile",function(req,res){
    res.render("profile");
})


//Decide the port of website
app.listen(process.env.port||3000,()=>{
    console.log('Running');
});