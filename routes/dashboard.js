const express = require("express");
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");
const middleware = require("../middleware/middleware");

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
    gfs.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          return res.render('home',{files:false});
        } else {
          const file_list = files.sort((a,b) =>{
            return (
              new Date(b.uploadDate).getTime()-new Date(a.uploadDate).getTime()
            );
          });
          return res.render('home',{files: file_list});
        }
      });
});

router.get("/login", (req,res) =>{
    res.render("login");
});

router.get("/signup", (req,res) =>{
    res.render("signup");
});

module.exports = router;