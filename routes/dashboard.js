const express    = require("express"),
	  middleware = require("../middleware/middleware"),
      router     = express.Router();


// IMPORT MODELS
const Supervisor = require("../models/supervisor"),
	  Form       = require("../models/form"),
	  Drc		 = require('../models/drc');

//HOMEPAGE

router.get("/", (req,res) =>{
	Drc.find({},(err,foundDrc) =>{
		if(err)
			console.log(err);
		else {
			if(req.isAuthenticated()){  
				Form.find({},(err,formList) =>{
					if(err || formList.length == 0){
						return res.render('home',{files:false, drc : foundDrc[0]});
					} else {
						return res.render('home',{files:formList, drc : foundDrc[0]});
					}
				});
			} else { 
				res.render('home',{drc : foundDrc[0]});
			}
		}
	});
});

router.delete('/:id',middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
	Drc.findByIdAndDelete({_id : req.params.id},(err,drcComm) =>{
		if(err || !drcComm){
			req.flash('error',"Cannot Delete Table!!");
			res.redirect('/');
		} else{
			req.flash('success','DRC Table Deleted Successfully!!');
			res.redirect('/');
		}
	});
});

module.exports = router;