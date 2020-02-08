const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");
const Sup = require("./models/supervisor");
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/mydb",{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Utilities"));
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"));

//Import routes
const supRoute = require("./routes/supervisor");
const dashRoute = require("./routes/dashboard");

app.use("/supervisor",supRoute);
app.use("/",dashRoute);

app.listen(process.env.port||3000,()=>{
    console.log('Running');
});