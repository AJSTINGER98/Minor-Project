const express = require("express");
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");

// IMPORT MODELS
const Supervisor = require("../models/supervisor");

//Setting up GridFS
const conn = mongoose.connection;

// //init gfs
let gfs;

conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});


router.get("/", (req,res) =>{
    // res.render("home");
    gfs.find({contentType: 'application/pdf'}).toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          return res.render('home',{files:false});
        } else {
          const file_list = files.sort((a,b) =>{
            return (
              new Date(b.uploadDate).getTime()-new Date(a.uploadDate).getTime()
            );
          });
          
          // if(req.isAuthenticated() && !req.user.isAdmin){
            
          //   userEmail = req.user.email;
          //   if(req.user.isSupervisor){
          //     Supervisor.findOne({'email':  userEmail}, (err,foundSupervisor) =>{
          //       var userProfileId = foundSupervisor._id;
          //       return res.render('home',{files: file_list, userProfileId: userProfileId});
          //     });
          //   } else {
          //     // Scholar.findOne({'email':  userEmail}, (err,foundSupervisor) =>{
          //       //   userProfileId = foundSupervisor._id;
          //       //   return res.render('home',{files: file_list, userProfileId: userProfileId});
          //       // });
          //     }
            
          // } else{
          // }
          return res.render('home',{files: file_list});
          
        }
      });
});


module.exports = router;