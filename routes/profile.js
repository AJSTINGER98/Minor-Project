const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");

//Setting up GridFS
const conn = mongoose.connection;


let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});



// SHOW ROUTE - Display Profile of Individuals
router.get("/:id",middleware.isLoggedIn,function(req,res){
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
                            res.render("profile",{supervisor : foundSupervisor, isOwner:isOwner,imgID: undefined});

                        } else{
                            // console.log(img[0]._id);
                            res.render("profile",{supervisor : foundSupervisor, isOwner:isOwner,imgID: img[0]._id});
                        }
                    });

                } else {
                    res.render("profile",{supervisor : foundSupervisor, isOwner:isOwner,imgID: undefined});
                }
            } else {
                isOwner = false;
                res.render("profile",{supervisor : foundSupervisor,isOwner:isOwner,imgID: undefined});
            }
        }
    });
});

router.post('/:id/image/upload',middleware.isLoggedIn, middleware.upload.single('image'),(req,res) =>{
    console.log(req.file);
    Supervisor.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,supervisor) =>{
        if(err){
            req.flash('error', "Could not add image");
            res.redirect('back');
        }
        else{
            res.redirect('back');
        }
    });
});

router.post("/:id/image/edit/:imgid",middleware.isLoggedIn,middleware.upload.single('image'),(req,res) =>{
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
  
});

module.exports = router;