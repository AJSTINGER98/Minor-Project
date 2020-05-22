// IMPORT ALL NPM MODULES 
const path                  = require('path'),
      flash                 = require('connect-flash'),
      express               = require('express'),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      localStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverride        = require("method-override");

const app = express();

// IMPORT MODELS
const Supervisor = require("./models/supervisor");

// SETUP CONNECTION TO DATABASE
const mongoURI = "mongodb://localhost:27017/mydb";
mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false});

// SET "EJS" AS DEFAULT VIEWING TEMPLATE
app.set("view engine", "ejs");

// SETUP BODY PARSER
app.use(express.json());
// Here setting extended to true allows body parser to convert the data of req.body into object and array form where necessary.
app.use(express.urlencoded({extended: true}));

// METHOD OVERRIDE FOR RESTful ROUTING
app.use(methodOverride("_method"));

// SETUP FLASH MESSAGES
app.use(flash());

// EXPRESS SESSION
app.use(require("express-session")({
    secret: "Minor Project",
    resave : false,
    saveUninitialized : false
}));

// SETUP DEFAULT(STATIC) DIRECTORIES
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Utilities"));
app.set('views', path.join(__dirname, 'views'));

// PASS LOCAL VARIABLES IN ALL ROUTES
app.use(function(req,res,next){
    res.locals.error     = req.flash("error");
    res.locals.warning   = req.flash("warning");
    res.locals.success   = req.flash("success");
    next();
});

// IMPORT ROUTES 
const supRoute     = require("./routes/supervisor");
const dashRoute    = require("./routes/dashboard");
const profileRoute = require("./routes/profile");
// const schRoute     = require("./routes/scholar");
const formRoute    = require("./routes/form");

// CALL ROUTES
app.use("/supervisor",supRoute);
// app.use("/scholar",schRoute);
app.use("/",profileRoute);
app.use("/",dashRoute);
app.use("/",formRoute);

// INITIALISE PORT TO START SERVER
app.listen(process.env.port||3000,()=>{
    console.log('Server Started');
});