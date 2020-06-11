const express    = require("express");
const router     = express.Router();


// IMPORT MODELS
const Supervisor = require("../models/supervisor");
const Form = require("../models/form");

//HOMEPAGE

router.get("/", (req,res) =>{
    // res.render("home");
  if(req.isAuthenticated()){  
    Form.find({},(err,formList) =>{
      if(err){
        return res.render('home',{files:false});
      } else{
        // console.log(formList);
        return res.render('home',{files:formList});
  
      }
    });

  } else{
    res.render('home');
  }

    // gfs.find({contentType: 'application/pdf'}).toArray((err, files) => {
    //     // Check if files
    //     if (!files || files.length === 0) {

		// 	return res.render('home',{files:false});
    //     } else {
		// 	const file_list = files.sort((a,b) =>{
		// 	return (
		// 		new Date(b.uploadDate).getTime()-new Date(a.uploadDate).getTime()
		// 	);
		// 	});

		// 	return res.render('home',{files: file_list});

    //     }
    //   });
});

module.exports = router;