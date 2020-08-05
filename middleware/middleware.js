const multer          = require('multer'),
      GridFsStorage   = require('multer-gridfs-storage'),
      crypto          = require('crypto'),
      path            = require("path");

const User            = require('../models/user'),
      Supervisor      = require('../models/supervisor'),
      Scholar         = require('../models/scholar');

var middlewareObject = {};

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err,buf) => {
				if(err){
					return reject(err);
				}
				const filename = file.originalname;

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


// CHECK AUTHENTICATION
middlewareObject.isLoggedIn = (req , res , next) => {
	if(req.isAuthenticated()){
		return next();
	}
	else{
		req.flash("warning" , "You are not logged in!!");
		res.redirect("/login");
	}
};

// CHECK IF USER IS ADMIN OR NOT
middlewareObject.isAdmin = (req, res , next) => {
	if(req.isAuthenticated()){
        if(req.user.isAdmin){
            next();
        } else {
            req.flash('error', 'You are not authorized to perform the action!!');
            res.redirect('back');
        }
	} else {
    req.flash('warning','Please Login to continue...');
    res.redirect('/login');
  }
};

// CHECK OWNERSHIP
middlewareObject.checkOwner = (req,res,next) =>{
    if(req.isAuthenticated()) {
        if(!req.user.isAdmin) {
        // console.log(req.user.refID,req.params.id);
            if(req.user.refID == req.params.id) {
                next();
            } else {
                req.flash('error','You are not authorized!!');
                res.redirect('back');
            }
        } else {
            req.flash('error','You are not authorized!!');
            res.redirect('back');
        }
    } else {
        req.flash('warning','Please Login to continue...');
        res.redirect('/login');
    }
};

// CHECK IF THE USER IS A SCHOLAR OR NOT
middlewareObject.isScholar = (req,res,next) =>{
    if(req.isAuthenticated()){
        if(!req.user.isAdmin && !req.user.isSupervisor){      
            next();
        } else {
            req.flash('error','Cannot upload report!');
            res.redirect('back');
        }
    }
};

// CHECK USER AUTHORITY
middlewareObject.hasAuthority = (req,res,next) =>{
    if(req.user.isAdmin || req.user.refID == req.params.id || req.user.isSupervisor){
        next(); 
    } else {
        req.flash('error', 'You are not authorized');
        res.redirect('back');
    }
};

// ADD SDC MEMBERS TO ARRAY
middlewareObject.addSDC = (req,res,next) =>{

    if(req.body.scholar && req.body.scholar.sdcMember && req.body.scholar.sdcMember.ID.length != 0){
        var sdcMem = req.body.scholar.sdcMember.ID,
            Id   = [],
            Name = [];
        sdcMem.forEach((memberId,index) =>{
        if(memberId == 0){
            Id.push(0);
            Name.push(req.body.dispName[index]); 
        } else {
            Supervisor.findById(memberId, function(err,foundSDC){
            if(err || !foundSDC){
              // console.log(err);
              // req.flash('error',"Either SDC Member doesn't Exists or has been moved somewhere else!!");
              // res.redirect('back');
                Id.push(0);
                Name.push(req.body.dispName[index]);
            } else {
                Id.push(foundSDC._id);
                if(foundSDC.middleName == null)
                    Name.push(`${foundSDC.title} ${foundSDC.firstName} ${foundSDC.lastName}`);          
                else
                    Name.push(`${foundSDC.title} ${foundSDC.firstName} ${foundSDC.middleName} ${foundSDC.lastName}`);
            }
            if(Id.length == sdcMem.length){
                req.Id   = Id;
                req.Name = Name;
                next();
               }
            });
           }
        });
    } else {
        next();
    }
};

module.exports = middlewareObject;

