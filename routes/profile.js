const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");
const Scholar = require("../models/scholar");
const User = require("../models/user");

// SHOW ROUTE - Display Profile of Individuals
router.get("/:person/:id",middleware.isLoggedIn,function(req,res){
    if(req.params.person == "supervisor"){
        // FIND SUPERVISOR
        Supervisor.findById(req.params.id,function(err,foundSupervisor){
            if(err){
                req.flash("error","Supervisor Doesn't Exists!!");
                res.redirect("/supervisor");
            } else {
                if(foundSupervisor._id.equals(req.user.refID)){
                    isOwner =  true;
                    // console.log(foundSupervisor.image);
                    if(foundSupervisor.image){
                        gfs.find({filename: foundSupervisor.image}).toArray((err,img)=>{
                            if(!img || img.length === 0){
                                res.render("profile",{personType: 'supervisor',person : foundSupervisor, path : "supervisor", isOwner:isOwner,imgID: undefined});
    
                            } else{
                                // console.log(img[0]._id);
                                res.render("profile",{personType: 'supervisor',person : foundSupervisor, path : "supervisor", isOwner:isOwner,imgID: img[0]._id});
                            }
                        });
    
                    } else {
                        res.render("profile",{personType: 'supervisor',person : foundSupervisor, path : "supervisor", isOwner:isOwner,imgID: undefined});
                    }
                } else {
                    isOwner = false;
                    res.render("profile",{personType: 'supervisor',person : foundSupervisor, path : "supervisor", isOwner:isOwner,imgID: undefined});
                }
            }
        });
    } else if (req.params.person == "scholar"){
        // FIND SCHOLAR
        Scholar.findById(req.params.id,function(err,foundScholar){
            if(err){
                req.flash("error","scholar Doesn't Exists!!");
                res.redirect("/scholar");
            } else {
                if(foundScholar._id.equals(req.user.refID)){
                    isOwner =  true;
                    // console.log(foundScholar.image);
                    if(foundScholar.image){
                        gfs.find({filename: foundScholar.image}).toArray((err,img)=>{
                            if(!img || img.length === 0){
                                res.render("profile",{personType: 'scholar',person : foundScholar, path : "scholar", isOwner:isOwner,imgID: undefined});
    
                            } else{
                                // console.log(img[0]._id);
                                res.render("profile",{personType: 'scholar',person : foundScholar, path : "scholar", isOwner:isOwner,imgID: img[0]._id});
                            }
                        });
    
                    } else {
                        res.render("profile",{personType: 'scholar',person : foundScholar, path : "scholar", isOwner:isOwner,imgID: undefined});
                    }
                } else {
                    isOwner = false;
                    res.render("profile",{personType: 'scholar',person : foundScholar, path : "scholar",isOwner:isOwner,imgID: undefined});
                }
            }
        });
    } else {
        req.flash('error',"Profile does not exist");
        res.redirect('back');
    }
});

// UPLOAD PROFILE PIC IF DOES NOT EXIST
router.post('/:person/:id/image/upload',middleware.isLoggedIn,middleware.checkOwner, middleware.upload.single('image'),(req,res) =>{
    // console.log(req.file);
    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,supervisor) =>{
            if(err){
                req.flash('error', "Could not add image");
                res.redirect('back');
            }
            else{
                res.redirect('back');
            }
        });

    } else if(req.params.person == "scholar"){
        Scholar.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,scholar) =>{
            if(err){
                req.flash('error', "Could not add image");
                res.redirect('back');
            }
            else{
                res.redirect('back');
            }
        });
    }
    else {
        req.flash('error','Profile does not exist');
        res.redirect('back');
    }
});

// EDIT ROUTE - Add,Remove or Update Value of Individuals---------------------------
router.get("/:person/:id/edit",middleware.isLoggedIn,middleware.checkOwner,function(req,res){
    if(req.params.person == "supervisor"){
        Supervisor.findById(req.params.id,function(err,foundSupervisor){
            if(err){
                req.flash("error","Something Went Wrong!!");
                res.redirect('back');
            } else {
                res.render("edit",{person : foundSupervisor, path : "supervisor"});
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findById(req.params.id,function(err,foundScholar){
            if(err){
                req.flash("error","Something Went Wrong!!");
                res.redirect('back');
            } else {
                res.render("edit",{person : foundScholar, path : "scholar"});
            }
        });
    } else{
        req.flash('error','Profile does not exist!');
        res.redirect('/');
    }
});

// UPDATE ROUTE - Store Changes to Database (if any) exists-----------------------------
router.put("/:person/:id",middleware.isLoggedIn,middleware.checkOwner,function(req,res){
    console.log(req.body);
    console.log(req.user.refID);
    console.log(req.user._id);
    console.log(req.params.id);
    data = {
        email : req.body.email,
        phone : req.body.phone,
        age   : req.body.age,
        academicQ : []
    };

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
        data.FoE.splice(data.FoE.length-1, 1);
    }

    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateSupervisor){
            if(err){
                req.flash("error","Could Not Submit,Kindly Try Again!!");
                res.redirect('/supervisor');
            } else {
                req.flash('success','Profile Updated!');
                res.redirect("/supervisor/"+req.params.id);
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateScholar){
            if(err){
                req.flash("error","Could Not Submit,Kindly Try Again!!");  
                res.redirect('/scholar');  
            } else {
                req.flash('success','Profile Updated!');
                res.redirect("/scholar/"+req.params.id);
            }
        });
    } else {
        req.flash('error','Profile does not exist !');
        res.redirect('/');
    }

    // UPDATE EMAIL ID IN USER MODEL AS WELL ------------> IMPORTANT
    if(req.params.id == req.user.refID){
        User.findByIdAndUpdate(req.user.id,{$set: {email : req.body.email}},function(err){
            if(err){
                console.log(err);
                res.redirect('back');
            }
        });
    }
});

// DELETE ROUTE - (Access only to Admin)
router.delete("/:person/:id",middleware.isLoggedIn,middleware.isAdmin,function(req,res){
    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndDelete(req.params.id,function(err,supervisor){
            if(err){
                req.flash('error','Could not delete Supervisor');
                res.redirect("/supervisor/"+req.params.id);
            } else {
                // console.log(supervisor);
                User.findOneAndDelete({refID: req.params.id}, (err,supUser)=>{
                    if(err){

                        req.flash('error','Could not remove User. Please delete Manually');
                        res.redirect('/supervisor');
                    } else{
                        // console.log(supUser);
                        req.flash('success','Supervisor has been removed');
                        res.redirect("/supervisor");
                    }
                });  
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findByIdAndDelete(req.params.id,function(err,scholar){
            if(err){
                req.flash('error','Could not delete Scholar');
                res.redirect("/scholar/"+req.params.id);  
            } else {
                // console.log(scholar);
                User.findOneAndDelete({refID: req.params.id}, (err,schUser)=>{
                    if(err){
                        req.flash('error','Could not remove User. Please delete Manually');
                        res.redirect('/scholar');
                    } else{
                        // console.log(schUser);
                        req.flash('success','Scholar has been removed');
                        res.redirect("/scholar");
                    }
                });
            }
        });
    } else {
        req.flash('error','Profile does not exist !');
        res.redirect('/');
    }

});

// UPLOAD EXISTING PROFILE PICTURE
router.post("/:person/:id/image/edit/:imgid",middleware.isLoggedIn,middleware.checkOwner,middleware.upload.single('image'),(req,res) =>{
    
    if(req.params.person == "supervisor"){
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err, data) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
                // console.log('success');
                Supervisor.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,supervisor) =>{
                    if(err){
                        req.flash('error', "Could not add image");
                        res.redirect('back');
                    }
                    else{
                        res.redirect('back');
                    }
                });
            }
          });
    } else if(req.params.person == 'scholar'){
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err, data) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
                // console.log('success');
                Scholar.findByIdAndUpdate(req.params.id,{'image': req.file.filename}, (err,scholar) =>{
                    if(err){
                        req.flash('error', "Could not add image");
                        res.redirect('back');
                    }
                    else{
                        res.redirect('back');
                    }
                });
            }
          });
    }
    else {
        req.flash('error','Profile does not exist');
        res.redirect('back');
    }
  
});

module.exports = router;