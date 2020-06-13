const express    = require("express"),
      router     = express.Router();


// IMPORT MODELS
const Supervisor = require("../models/supervisor"),
      Form       = require("../models/form");

//HOMEPAGE

router.get("/", (req,res) =>{

  if(req.isAuthenticated()){  
    Form.find({},(err,formList) =>{
    	if(err || formList.length == 0){
        	return res.render('home',{files:false});
      	} else {
        	return res.render('home',{files:formList});
      	}
    });
  	} else { 
    	res.render('home');
  	}
});

module.exports = router;