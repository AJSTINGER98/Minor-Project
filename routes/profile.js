const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");
const Scholar = require("../models/scholar");

// SHOW ROUTE - Display Profile of Individuals ----------------------------------
router.get("/:person/:id",function(req,res){
    // find supervisor or scholar
    if(req.params.person == "supervisor"){
        Supervisor.findById(req.params.id,function(err,foundPerson){
            if(err){
                req.flash("error","Supervisor Doesn't Exists!!");
                res.redirect("/supervisor");
            } else {
                res.render("profile",{person : foundPerson ,path : "supervisor"});
            }
        });
    } else if(req.params.person == "scholar"){
        Scholar.findById(req.params.id,function(err,foundPerson){
            if(err){
                req.flash("error","Scholar Doesn't Exists!!");
                res.redirect("/scholar");
            } else {
                res.render("profile",{person : foundPerson,path : "scholar"});
            }
        });
    }
});


// EDIT ROUTE - Add,Remove or Update Value of Individuals---------------------------
router.get("/:person/:id/edit",function(req,res){
    if(req.params.person == "supervisor"){
        Supervisor.findById(req.params.id,function(err,foundSupervisor){
            if(err){
                req.flash("error","Something Went Wrong!!");
                res.redirect("/supervisor/"+req.params.id);
            } else {
                res.render("edit",{person : foundSupervisor, path : "supervisor"})
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findById(req.params.id,function(err,foundScholar){
            if(err){
                req.flash("error","Something Went Wrong!!");
                res.redirect("/scholar/"+req.params.id);
            } else {
                res.render("edit",{person : foundScholar, path : "scholar"})
            }
        });
    }
});

// UPDATE ROUTE - Store Changes to Database (if any) exists-----------------------------
router.put("/:person/:id",function(req,res){
    console.log(req.body);
    data = {
        email : req.body.email,
        phone : req.body.phone,
        age   : req.body.age,
        academicQ : []
    }

    // Update Academic Qualifications (if any)
    for(var i = 0; i < req.body.academicQ.degree.length;i++){
        temp = {
            degree        : req.body.academicQ.degree[i],
            specialisation: req.body.academicQ.specialisation[i],
            institute     : req.body.academicQ.institute[i],
            yoc           : req.body.academicQ.yoc[i],
        };
        data.academicQ.push(temp);
    }

    // Update Experience (if any)
    if(req.body.experience){
        data.experience = [];
        for(i = 0; i < req.body.experience.organisation.length;i++){
            temp = {
                organisation: req.body.experience.organisation[i],
                designation : req.body.experience.designation[i],
                role        : req.body.experience.role[i],
                tenure      : req.body.experience.tenure[i],
            };
            data.experience.push(temp);
        }
    }

    // Update Research (if any)
    if(req.body.research){
        data.research = [];
        for(i = 0; i < req.body.research.title.length;i++){
            temp = {
                title   : req.body.research.title[i],
                duration: req.body.research.duration[i],
                agency  : req.body.research.agency[i],
                role    : req.body.research.role[i],
                amount  : req.body.research.amount[i],
            };
            // console.log(temp)
            data.research.push(temp);
        }
    }

    // Update FoE
    if(req.body.FoE){
        data.FoE = req.body.FoE;
    }

    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateSupervisor){
            if(err){
                req.flash("error","Could Not Submit,Kindly Try Again!!");
            } else {
                res.redirect("/supervisor/"+req.params.id);
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateScholar){
            if(err){
                req.flash("error","Could Not Submit,Kindly Try Again!!");  
            } else {
                res.redirect("/scholar/"+req.params.id);
            }
        });
    }
});

// DELETE ROUTE - (Access only to User)
router.delete("/:person/:id",function(req,res){
    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndDelete(req.params.id,function(err){
            if(err){
                res.redirect("/supervisor/"+req.params.id);
            } else {
                res.redirect("/supervisor");   
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findByIdAndDelete(req.params.id,function(err){
            if(err){
                res.redirect("/scholar/"+req.params.id);  
            } else {
                res.redirect("/scholar")
            }
        });
    }
})

module.exports = router;