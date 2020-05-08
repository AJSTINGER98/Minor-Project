const express = require("express");
const router = express.Router();

// IMPORT MODEL
const Supervisor = require("../models/supervisor");

// SHOW ROUTE - Display Profile of Individuals
router.get("/:id",function(req,res){
    // find supervisor
    Supervisor.findById(req.params.id,function(err,foundSupervisor){
        if(err){
            req.flash("error","Supervisor Doesn't Exists!!");
            res.redirect("/supervisor");
        } else {
            res.render("profile",{supervisor : foundSupervisor});
        }
    });
});

module.exports = router;