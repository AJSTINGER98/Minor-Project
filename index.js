// IMPORT ALL NPM MODULES
const path                  = require('path'),
      flash                 = require('connect-flash'),
      express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      localStrategy         = require('passport-local'),
      methodOverride        = require('method-override'),
      helmet                = require('helmet');

const app = express();

// IMPORT MODELS
const User = require("./models/user");

// SETUP CONNECTION TO DATABASE
mongoURI = "mongodb+srv://AJStinger98:AJStinger98@cluster0-ajeew.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify : false});

// SET "EJS" AS DEFAULT VIEWING TEMPLATE
app.set("view engine", "ejs");

// SETUP BODY PARSER
app.use(express.json());

// SETTING EXTENDED TO TRUE TO CONVERT req.body into object and array form when necessary.
app.use(express.urlencoded({extended : true}));

// METHOD OVERRIDE FOR RESTful ROUTING
app.use(methodOverride("_method"));

// SETUP FLASH MESSAGES
app.use(flash());

// EXPRESS SESSION
app.use(require("express-session")({
    secret: "Minor Project",
    resave: false,
    saveUninitialized: false
}));

// SETUP AUTHENTICATION
app.use(passport.initialize());                         //initialize passport
app.use(passport.session());                            //tell passport to maintain persistent login session
passport.use(new localStrategy(User.authenticate()));   //tell localStrategy to use authenticate() method
passport.serializeUser(User.serializeUser());           //determine which data of user is to be stored in session as seesion id
passport.deserializeUser(User.deserializeUser());       //used to retrieve the whole object of the user using the session id

// SETUP DEFAULT(STATIC) DIRECTORIES
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/Utilities"));
app.set('views', path.join(__dirname, 'views'));

// PASS LOCAL VARIABLE IN ALL ROUTES
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");
    res.locals.success = req.flash("success");
    next();
});

//Setting up GridFS

const conn = mongoose.connection;

conn.once("open", () => {
  // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});


// IMPORT ROUTES
const supRoute     = require("./routes/supervisor");
const schRoute     = require("./routes/scholar");
const dashRoute    = require("./routes/dashboard");
const formRoute    = require("./routes/form");
const profileRoute = require("./routes/profile");
const authRoute    = require("./routes/authentication");

// CALL ROUTES
app.use("/supervisor",supRoute);
app.use("/scholar",schRoute);
app.use("/form",formRoute);
app.use("/",profileRoute);
app.use("/",authRoute);
app.use("/",dashRoute);

// HELMET PROTECTS APP FROM WELL KNOW EXPRESS VULNERABILITIES
app.use(helmet());

// INITIALIZE PORT TO START SERVER
app.listen(process.env.port || 3000,() =>{
    console.log("Server Started");
});
