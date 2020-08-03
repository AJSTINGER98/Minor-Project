const express    = require('express'),
      middleware = require("../middleware/middleware"), 
      mongoose   = require("mongoose");

const router = express.Router();
const Notification  = require('../models/notification');

// INDEX ROUTE TO RENDER NOTIFICATION PAGE
router.get('/', middleware.isLoggedIn, middleware.isAdmin, (req,res) =>{
    Notification.find({},(err,foundNotification) =>{
        if(err) {
            req.flash('error','Please Refresh The Page and Try Again');
        } else {
            res.render('notification',{notify : foundNotification});
        }
    });
});

// CREATE ROUTE 
router.post('/', middleware.isLoggedIn, middleware.isAdmin, (req,res) =>{
    Notification.create(req.body,(err,notification) =>{
        if(err){
            console.log(err);
            req.flash('error','Could not create Notification!!');
        } else {
            req.flash('success','Notification created Successfully..');
            res.redirect('/notification');
        }
    });
});

// UPDATE NOTIFICATIONS
router.put("/:id", middleware.isLoggedIn, middleware.isAdmin, function(req,res){
    Notification.findByIdAndUpdate(req.params.id,req.body,function(err,updatedNotification){
        if(err){
            req.flash('error',"Could not update the Changes,Please Try Again!!");
            res.redirect("/notification");
        } else {
            req.flash('success','Updated Successfully...');
            res.redirect("/notification");
        }
    });
});

// DELETE NOTIFICATIONS
router.delete("/:id", middleware.isLoggedIn, middleware.isAdmin, function(req,res){
    Notification.findByIdAndDelete(req.params.id,function(err,deletedNotification){
        if(err){
            req.flash('error','Could not delete Notification,Please Try Again!!!');
        } else {
            req.flash('success','Notification Deleted Successfully...');
            res.redirect("/notification");
        }
    });
});

module.exports = router;