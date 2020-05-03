const express = require("express");
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");

//Setting up GridFS
const conn = mongoose.connection;

//init gfs
let gfs;

conn.once("open", () => {
    // init stream
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
});



router.get("/", (req,res) =>{
    // res.render("home");
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
          return res.render('home',{files:false});
        } else {
          return res.render('home',{files: files});
        }
      });
});

module.exports = router;