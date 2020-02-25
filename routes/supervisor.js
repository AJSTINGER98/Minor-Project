const express = require("express");
const router = express.Router();

//Import models
const supervisor = require("../models/supervisor");


router.get("/",(req,res)=>{
    supervisor.find({},function(err, supervisor){
		if(err){
			console.log(err);
		}
		else{
            res.render("supervisor",{supervisor:supervisor});
		}
	});

});

router.post("/", (req,res) =>{

    supData = {
        Name: req.body.fname + " " + req.body.lname,
        Age: req.body.age,
        Department: req.body.dep,
        FoE: req.body.fields,
        YoC: req.body.YoC,
    };
    console.log(supData);
    supervisor.create(supData, (err,supervisor) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/supervisor");
        }
    });

});





module.exports = router;