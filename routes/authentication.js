const   express     = require('express'),
        middleware  = require('../middleware/middleware'),
        passport    = require('passport');

// SETUP ROUTER
const router  = express.Router();

// IMPORT USER MODEL
const User = require('../models/user');

// RENDER SIGNUP PAGE
router.get('/signup',middleware.isLoggedIn,middleware.isAdmin, (req,res) =>{
    res.render('signup');
});

// CREATE USER
router.post('/signup' ,middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
    if(req.body.password === req.body.confirm_password){
        User.register(new User({ 
            username: req.body.username,
            email: req.body.email,
            isAdmin: true,
    
        }), req.body.password, function(err,user){
            if(err || !user){
                req.flash('error', 'Unable to Sign Up');
                return res.redirect('/signup');
            } else{
                req.flash('success','New Admin Added');
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
}),(req, res)=> {
});

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

//CHANGE PASSWORD
router.get('/changepassword',middleware.isLoggedIn, (req,res) =>{
    res.render('changepassword');
});

router.post('/changepassword',middleware.isLoggedIn, (req,res) =>{
    if(req.body.newPassword === req.body.confirmPassword){
        req.user.changePassword(req.body.oldPassword , req.body.newPassword, (err,user)=>{
            if(err || !user){
                req.flash('error','Old password is incorrect');
                res.redirect('back');
            }
            else{
                req.flash('success','Password has been changed');
                res.redirect('/');
            }
        });

    } else {
        req.flash('warning','New Passwords do not match !');
        res.redirect('back');
    }
});

module.exports = router;