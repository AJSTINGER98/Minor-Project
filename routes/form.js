const express    = require('express');
const middleware = require("../middleware/middleware"); 
const mongoose   = require("mongoose");

const router = express.Router();

const Form = require('../models/form');

router.post('/upload',middleware.isLoggedIn, middleware.isAdmin,middleware.upload.single('file'), (req, res) => {

  formData = {
    formId: req.file.id,
    formName: req.file.originalname,
    formHexName: req.file.filename,
  };

  Form.create(formData, (err,form) =>{
      if(err){
        req.flash('error', 'Could not upload Form!');
        res.redirect('/');
      } else {
        req.flash('success','Form Uploaded');
        res.redirect('/');
      }
  });
    // res.json({ file: reqconst .file });
});

router.get('/:id/:filename',middleware.isLoggedIn,(req, res) => {
    const file = gfs.find({ _id: mongoose.Types.ObjectId(req.params.id),filename: req.params.filename }).toArray((err, file) => {
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

  Form.findOneAndDelete({formId: req.params.id},(err,formData) =>{
    if(err){
      req.flash('error','Could not Delete PDF');
      res.redirect('/');
    }
    else{
      gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) return res.status(404).json({ err: err.message });
        else{
          console.log(data);
          res.redirect("/");
        }
      });
    }
  });

});

module.exports = router;