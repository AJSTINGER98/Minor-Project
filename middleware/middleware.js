const multer          = require('multer'),
      GridFsStorage   = require('multer-gridfs-storage'),
      Grid            = require('gridfs-stream'),
      crypto          = require('crypto'),
      path            = require("path");

const User = require('../models/user');

var middlewareObject = {};

const mongoURI = 'mongodb://localhost:27017/mydb';

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err,buf) => {
              if(err){
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
	  });
	}
});

middlewareObject.upload = multer({ storage });

//CHECK AUTHENTICATION
middlewareObject.isLoggedIn = (req , res , next) => {
	if(req.isAuthenticated()){
		return next();
	}
	else{
		req.flash("error" , "You are not logged in !!");
		res.redirect("/login");
	}
};

//CHECK IF USER IS ADMIN OR NOT
middlewareObject.adminAuth = (req, res , next) => {
	if(req.isAuthenticated()){
		User.findById(req.user._id, (err,user) => {
			if(err){
				req.flash('error', "Oops! Something went wrong");
				res.redirect('back');
			} else {
				if(user.isAdmin){
				next();
				}
				else{
				req.flash('error', 'You are not authorized to do that !!');
				res.redirect('back');
				}
			} 
		});
	}
};

module.exports = middlewareObject;