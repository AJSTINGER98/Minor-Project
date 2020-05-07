const express = require("express");
const router = express.Router();

//IMPORT MODEL
const Supervisor = require("../models/supervisor");

// INDEX ROUTE - Show all Supervisors
router.get("/",(req,res)=>{
    Supervisor.find({},function(err, allsupervisor){
		if(err){
            req.flash('error',"Something went wrong, Please Try Again");
			console.log(err);
		} else {
            res.render("supervisor",{supervisor:allsupervisor});
		}
	});
});

// CREATE ROUTE - Add Supervisor to database
router.post("/", (req,res) =>{
    // eval(require('locus')); 
    console.log(req.body.supervisor);
    Supervisor.find({},function(err,supervisor){
        if(err){
            req.flash("Something went wrong,Pleaase try again!!");
            console.log(err);
        } else {
            var id;
            if(supervisor.length == 0){
                id=1;
            } else {
                id = supervisor[supervisor.length-1].spID + 1;
            }
            var Sup = req.body.supervisor;
        }
    });
});

module.exports = router;