const express    = require('express');
const middleware = require("../middleware/middleware"); 
const mongoose   = require("mongoose");

const router = express.Router();

router.post('/upload',middleware.isLoggedIn, middleware.isAdmin,middleware.upload.single('file'), (req, res) => {
	res.redirect('/');
    // res.json({ file: reqconst .file });
});

router.get('/:filename',middleware.isLoggedIn,(req, res) => {
    const file = gfs.find({ filename: req.params.filename }).toArray((err, file) => {
		// Check if file exists
		if (!file || file.length === 0) {
		return res.status(404).json({
			err: 'No file exists'
		});
		}
		// If File exists this will get executed
		return gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

router.delete('/:id', middleware.isLoggedIn,middleware.isAdmin,(req,res) => {
  
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    else{
      console.log('success');
      res.redirect("/");
    }
  });
});

module.exports = router;