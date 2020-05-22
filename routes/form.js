const express    = require('express');
const router     = express.Router();
const middleware = require("../middleware/middleware"); 
const Grid       = require('gridfs-stream');
const mongoose   = require("mongoose");

//Setting up GridFS
const conn = mongoose.connection;

// init gfs
let gfs;

conn.once("open", () => {
    // init stream
	gfs = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "uploads"
	});
});

router.post('/upload', middleware.upload.single('file'), (req, res) => {
    res.redirect('/');
    // res.json({ file: req.file });
});

router.get('/form/:filename',(req, res) => {
    
    const file = gfs.find({ filename: req.params.filename }).toArray((err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // If File exists this will get executed
      return gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
  });

router.delete('/:id', (req,res) => {
	console.log(req.params.id);
	gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
		if (err) 
			return res.status(404).json({ err: err.message });
		console.log('success');
		res.redirect("/");
	});
});

module.exports = router;