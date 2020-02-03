const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");
const Sup = require("./models/supervisor");
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/mydb",{ useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static(__dirname + "/public"));
mongoose.set('useFindAndModify', false);   
app.use(methodOverride("_method"));

//Import routes
const supRoute = require("./routes/supervisor");

app.use("/supervisor",supRoute);

app.listen(process.env.port||3000,()=>{
    console.log('Running');
});