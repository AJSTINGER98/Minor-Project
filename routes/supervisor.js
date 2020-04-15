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
            res.render("supervisor",{ supervisor: supervisor});
		}
	});
});

router.post("/", (req,res) =>{
    supervisor.find({},function(err, sup){
        if(err){
            console.log(err);
		}
		else{
            var id;
            if(sup.length == 0){
                id = 1;
            }
            else{
                id = sup[sup.length-1].spID +1;
            }
            supData = {
                spID: id,
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
		}
	});


});





module.exports = router;