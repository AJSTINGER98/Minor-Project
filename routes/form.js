const express = require('express');
const middleware = require("../middleware/middleware"); 
const Grid = require('gridfs-stream');
const mongoose = require("mongoose");


const router = express.Router();



//Setting up GridFS
const conn = mongoose.connection;

//init gfs
let gfs;

conn.once("open", () => {
    // init stream
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
});





router.post('/upload', middleware.upload.single('file'), (req, res) => {
    res.redirect('/');
    // res.json({ file: req.file });
});

router.get('/form/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // If File exists this will get executed
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    });
  });

router.delete('/:id', (req,res) => {
  console.log(req.params.id);
  gfs.remove({_id : req.params.id , root: 'uploads'}, function (err) {
    if (err) {
      console.log(err);
    }else{
      console.log('success');
    }
    res.redirect('back');
  });
});

module.exports = router;