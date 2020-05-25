const   express  = require('express'),
        passport = require('passport');

// SETUP ROUTER
const router  = express.Router();

// IMPORT USER MODEL
const User = require('../models/user');

// RENDER SIGNUP PAGE
router.get('/signup', (req,res) =>{
    res.render('signup');
});

// CREATE USER
router.post('/signup' ,(req,res) =>{
    if(req.body.password === req.body.confirm_password){
        User.register(new User({ 
            username: req.body.username,
            email: req.body.email,
            isAdmin: true,
    
        }), req.body.password, function(err,user){
            if(err){
                req.flash('error', 'Unable to Sign Up');
                return res.redirect('/signup');
            }
            else{
                req.flash('success','Logged In Successfully');
                res.redirect('/');
            }
        });

    }
    else{
        req.flash('error', 'Password Fields do not match');
        res.redirect('/signup');
    }
});

// RENDER LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login');
});

// TEST FOR AUTHENTICATION
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}),(req, res)=> {});

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;