const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");
const Scholar = require("../models/scholar");

// SHOW ROUTE - Display Profile of Individuals
router.get("/:person/:id",middleware.isLoggedIn,function(req,res){
    if(req.params.person == "supervisor"){

        // find supervisor
        Supervisor.findById(req.params.id,function(err,foundSupervisor){
            if(err){
                req.flash("error","Supervisor Doesn't Exists!!");
                res.redirect("/supervisor");
            } else {
                
                if(foundSupervisor._id.equals(req.user.refID)){
                    isOwner =  true;
                    // console.log(foundSupervisor.image);
                    if(foundSupervisor.image){
                        gfs.find({filename: foundSupervisor.image}).toArray((err,img)=>{
                            if(!img || img.length === 0){
                                res.render("profile",{personType: 'supervisor',person : foundSupervisor, isOwner:isOwner,imgID: undefined});
    
                            } else{
                                // console.log(img[0]._id);
                                res.render("profile",{personType: 'supervisor',person : foundSupervisor, isOwner:isOwner,imgID: img[0]._id});
                            }
                        });
    
                    } else {
                        res.render("profile",{personType: 'supervisor',person : foundSupervisor, isOwner:isOwner,imgID: undefined});
                    }
                } else {
                    isOwner = false;
                    res.render("profile",{personType: 'supervisor',person : foundSupervisor,isOwner:isOwner,imgID: undefined});
                }
            }
        });
    } else if (req.params.person == "scholar"){
        // find scholar
        Scholar.findById(req.params.id,function(err,foundScholar){
            if(err){
                req.flash("error","scholar Doesn't Exists!!");
                res.redirect("/scholar");
            } else {
                
                if(foundScholar._id.equals(req.user.refID)){
                    isOwner =  true;
                    // console.log(foundScholar.image);
                    if(foundScholar.image){
                        gfs.find({filename: foundScholar.image}).toArray((err,img)=>{
                            if(!img || img.length === 0){
                                res.render("profile",{personType: 'scholar',person : foundScholar, isOwner:isOwner,imgID: undefined});
    
                            } else{
                                // console.log(img[0]._id);
                                res.render("profile",{personType: 'scholar',person : foundScholar, isOwner:isOwner,imgID: img[0]._id});
                            }
                        });
    
                    } else {
                        res.render("profile",{personType: 'scholar',person : foundScholar, isOwner:isOwner,imgID: undefined});
                    }
                } else {
                    isOwner = false;
                    res.render("profile",{personType: 'scholar',person : foundScholar,isOwner:isOwner,imgID: undefined});
                }
            }
        });
    } else {
        req.flash('error',"Profile does not exist");
        res.redirect('back');
    }
});

router.post('/:person/:id/image/upload',middleware.isLoggedIn,middleware.checkOwner, middleware.upload.single('image'),(req,res) =>{
    console.log(req.file);
    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,supervisor) =>{
            if(err){
                req.flash('error', "Could not add image");
                res.redirect('back');
            }
            else{
                res.redirect('back');
            }
        });

    } else if(req.params.person == "scholar"){
        Scholar.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,scholar) =>{
            if(err){
                req.flash('error', "Could not add image");
                res.redirect('back');
            }
            else{
                res.redirect('back');
            }
        });
    }
    else {
        req.flash('error','Profile does not exist');
        res.redirect('back');
    }
});



router.post("/:person/:id/image/edit/:imgid",middleware.isLoggedIn,middleware.checkOwner,middleware.upload.single('image'),(req,res) =>{
    
    if(req.params.person == "supervisor"){
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err, data) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
                console.log('success');
                Supervisor.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,supervisor) =>{
                    if(err){
                        req.flash('error', "Could not add image");
                        res.redirect('back');
                    }
                    else{
                        res.redirect('back');
                    }
                });
            }
          });
    } else if(req.params.person == 'scholar'){
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err, data) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
                console.log('success');
                Scholar.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,scholar) =>{
                    if(err){
                        req.flash('error', "Could not add image");
                        res.redirect('back');
                    }
                    else{
                        res.redirect('back');
                    }
                });
            }
          });
    }
    else {
        req.flash('error','Profile does not exist');
        res.redirect('back');
    }
  
});

//=================================================================================================


module.exports = router;