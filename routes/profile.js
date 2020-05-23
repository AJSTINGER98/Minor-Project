const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");
const Scholar = require("../models/scholar");

// SHOW ROUTE - Display Profile of Individuals
router.get("/:person/:id",middleware.isLoggedIn,function(req,res){
    // find supervisor or scholar
    if(req.params.person == "supervisor"){
        Supervisor.findById(req.params.id,function(err,foundPerson){
            if(err){
                req.flash("error","Supervisor Doesn't Exists!!");
                res.redirect("/supervisor");
            } else {
                res.render("profile",{person : foundPerson});
            }
        });
    } else if(req.params.person == "scholar"){
        Scholar.findById(req.params.id,function(err,foundPerson){
            if(err){
                req.flash("error","Scholar Doesn't Exists!!");
                res.redirect("/scholar");
            } else {
                res.render("profile",{person : foundPerson});
            }
        });
    }
});

module.exports = router;