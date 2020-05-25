const multer          = require('multer'),
      GridFsStorage   = require('multer-gridfs-storage'),
      crypto          = require('crypto'),
      path            = require("path");

const User = require('../models/user');
const Supervisor = require('../models/supervisor');
const Scholar = require('../models/scholar');

var middlewareObject = {};

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err,buf) => {
              if(err){
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              console.log(req.user._id);
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
middlewareObject.isAdmin = (req, res , next) => {
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

//CHECK OWNERSHIP

middlewareObject.checkOwner = (req,res,next) =>{
  if(req.isAuthenticated()){
    if(!req.user.isAdmin){
      if(req.user.isSupervisor){
        Supervisor.findById(req.params.id , (err,foundSup)=>{
          if(err || !foundSup){
            req.flash('error','Supervisor not found');
            res.redirect('back');
          }
          else{
            if(foundSup._id.equals(req.user.refID)){
              next();
            }
            else{
              req.flash('error','You are not authorized');
              res.redirect('back');
            }
          }
        });
      }
      else{
        Scholar.findById(req.params.id , (err,foundSup)=>{
          if(err || !foundSup){
            req.flash('error','Scholar not found');
            res.redirect('back');
          }
          else{
            if(foundSup._id.equals(req.user.refID)){
              next();
            }
            else{
              req.flash('error','You are not authorized');
              req.redirect('back');
            }
          }
        });

      }
    }
  }
};


module.exports = middlewareObject;

