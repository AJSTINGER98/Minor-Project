var express = require("express");
var router  = express.Router();

// Below three variables are required to reset password
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

// IMPORT MODEL
var User = require("../models/user");
  
// FORGOT PASSWORD POST ROUTE
router.post('/forgot', function(req, res, next) {
    async.waterfall([
    function(done) {
        crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
        });
    },
    function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            req.flash('error', 'No account with that Email Address exists.');
            return res.redirect('/login');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
            done(err, token, user);
            });
        });
    },
    function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'amann.jha1998@gmail.com',
            pass: process.env.GMAILPW
        }
        });
        var mailOptions = {
        to: user.email,
        from: 'amann.jha1998@gmail.com',
        subject: 'PhD Portal Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
        });
    }
    ], function(err) {
    if (err) return next(err);
    res.redirect('/login');
    });
});

// RESET PASSWORD GET ROUTE
router.get('/reset/:token', function(req, res) {
    //$gt - greater than
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/login');
    }
    res.render('reset', {token: req.params.token});
    });
});

// RESET PASSWORD POST ROUTE
router.post('/reset/:token', function(req, res) {
    async.waterfall([
    function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
                req.logIn(user, function(err) {
                done(err, user);
                });
            });
            });
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
        });
    },
    function(user, done) {
        var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'amann.jha1998@gmail.com',
            pass: process.env.GMAILPW
        }
        });
        var mailOptions = {
        to: user.email,
        from: 'amann.jha1998@gmail.com',
        subject: 'Phd Portal || Password has been changed',
        text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' associated with PhD Portal has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Your password has been changed Successfully.');
        done(err);
        });
    }
    ], function(err) {
    res.redirect('/');
    });
});
  
module.exports = router;