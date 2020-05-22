// IMPORT ALL NPM MODULES 
const path                  = require('path'),
      flash                 = require('connect-flash'),
      express               = require('express'),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      localStrategy         = require("passport-local"),
      methodOverride        = require("method-override"),
      helmet                = require('helmet'),
      bodyParser            = require('body-parser');
       


const app = express();

// IMPORT MODELS
const User = require("./models/user");

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

//SETUP AUTHENTICATION


app.use(passport.initialize());                         //initialize passport
app.use(passport.session());                            //tell passport to maintain a persistent login session
passport.use(new localStrategy(User.authenticate()));   //Tell localStrategy to use authenticate() method
passport.serializeUser(User.serializeUser());           //Determines which data of user is to be stored in the session as session id
passport.deserializeUser(User.deserializeUser());       //Used to retrieve the whole object of the user using the session id


// SETUP DEFAULT(STATIC) DIRECTORIES
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Utilities"));
app.set('views', path.join(__dirname, 'views'));


// PASS LOCAL VARIABLES IN ALL ROUTES
app.use(function(req,res,next){
    // res.locals.currentUser = req.user? req.user.username : undefined;
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.warning   = req.flash("warning");
    res.locals.success   = req.flash("success");
    next();
});

// IMPORT ROUTES 
const supRoute     = require("./routes/supervisor");
const dashRoute    = require("./routes/dashboard");
const formRoute    = require("./routes/form");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/authentication");



// CALL ROUTES
app.use("/supervisor",profileRoute);
app.use("/supervisor",supRoute);
app.use("/",dashRoute);
app.use("/",formRoute);
app.use("/",authRoute);



// HELMET PROTECTS APP FROM WELL KNOWN EXPRESS VULNERABILITIES
app.use(helmet());

// INITIALISE PORT TO START SERVER
app.listen(process.env.port||3000,()=>{
    console.log('Server Started');
});