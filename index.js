const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname represent the current directory in which we are working
app.use(methodOverride("_method"));

app.listen(process.env.port||3000,()=>{
    console.log('Running');
});