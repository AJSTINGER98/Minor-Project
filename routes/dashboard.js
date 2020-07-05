const express    = require("express"),
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

module.exports = router;