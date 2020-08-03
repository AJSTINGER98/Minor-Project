const express       = require("express"),
      router        = express.Router(),
      mongoose      = require('mongoose'),
      middleware    = require("../middleware/middleware");


// IMPORT MODEL
const Supervisor    = require("../models/supervisor"),
      Scholar       = require("../models/scholar"),
      User          = require("../models/user");

// SHOW ROUTE - Display Profile of Individuals
router.get("/:person/:id",middleware.isLoggedIn,function(req,res){
    if(req.params.person == "supervisor"){
        if(req.user.isAdmin || req.user.refID == req.params.id){
            // FIND SUPERVISOR
            Supervisor.findById(req.params.id,function(err,foundSupervisor){
                if(err || !foundSupervisor){
                    req.flash("error","Supervisor Doesn't Exists!!");
                    res.redirect("/supervisor");
                } else {
                    if(foundSupervisor._id.equals(req.user.refID)){
                        isOwner =  true;
                        res.render("profile",{person : foundSupervisor, path : "supervisor", isOwner:isOwner});
                    
                    } else {
                        isOwner = false;
                        res.render("profile",{person : foundSupervisor, path : "supervisor", isOwner:isOwner});
                    }
                }
            });
        } else{
            req.flash('warning','You are not allowed to view this profile');
            res.redirect('/supervisor');
        }
    } else if (req.params.person == "scholar"){
    
        // FIND SCHOLAR
        if(req.user.isAdmin || req.user.isSupervisor || req.user.refID == req.params.id){
            Scholar.findById(req.params.id,function(err,foundScholar){
                if(err || !foundScholar){
                    req.flash("error","Scholar Doesn't Exists!!");
                    res.redirect("/scholar");
                } else {
                    if(req.user.isAdmin || req.user.refID == req.params.id || req.user.refID == foundScholar.supervisedBy.ID.toString()){
                        if(foundScholar._id.equals(req.user.refID)){
                            isOwner =  true;
                            res.render("profile",{person : foundScholar, path : "scholar", isOwner:isOwner});
                        } else {
                            isOwner = false;
                            res.render("profile",{person : foundScholar, path : "scholar",isOwner:isOwner});
                        }

                    } else {
                        req.flash('warning','You are not allowed to view this profile');
                        res.redirect('/scholar');
                    }
                }
            });

        } else {
            req.flash('warning','You are not allowed to view this profile');
            res.redirect('/scholar');
        }
    } else {
        req.flash('error',"Profile does not exist");
        res.redirect('back');
    }
});

// UPLOAD PROFILE PIC IF DOES NOT EXIST
router.post('/:person/:id/image/upload',middleware.isLoggedIn,middleware.checkOwner, middleware.upload.single('image'),(req,res) =>{

    image = {
        imgID : req.file.id,
        imgName: req.file.filename
    };
    if(req.params.person == "supervisor"){
        Supervisor.findByIdAndUpdate(req.params.id,{'image': image}, (err,supervisor) =>{
            if(err || !supervisor){
                req.flash('error', "Could not add image");
                res.redirect('back');
            }
            else{
                res.redirect('back');
            }
        });

    } else if(req.params.person == "scholar"){
        Scholar.findByIdAndUpdate(req.params.id,{'image': image}, (err,scholar) =>{
            if(err || !scholar){
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
router.get("/:person/:id/edit",middleware.isLoggedIn,middleware.hasAuthority,function(req,res){
    if(req.params.person == "supervisor"){
        Supervisor.findById(req.params.id,function(err,foundSupervisor){
            if(err || !foundSupervisor){
                req.flash("error","Something Went Wrong!!");
                res.redirect('back');
            } else {
                if(req.user.isAdmin || req.user.refID == req.params.id){
                    res.render("edit",{person : foundSupervisor, path : "supervisor",allSupervisor: false});

                } else{
                    req.flash('error','You are not authorized');
                    res.redirect('back');
                }
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findById(req.params.id,function(err,foundScholar){
            if(err || !foundScholar){
                req.flash("error","Something Went Wrong!!");
                res.redirect('back');
            } else {
                if(req.user.isAdmin || req.user.refID == foundScholar.supervisedBy.ID.toString()){
                    Supervisor.find({},(err,allSupervisor) =>{
                        if(err){
                            req.flash('warning','Error while looking for Supervisors');
                            // res.redirect('back');
                            allSupervisor = [];
                        } 
                        res.render("edit",{person : foundScholar, path : "scholar",allSupervisor: allSupervisor});
                        
                    });
                } else if(req.user.refID == req.params.id){
                    res.render("edit",{person : foundScholar, path : "scholar",allSupervisor: false});
                        
                } else {
                    req.flash('error','You are not authorized');
                    res.redirect('back');
                }
            }
        });
    } else{
        req.flash('error','Profile does not exist!');
        res.redirect('/');
    }
});

// UPDATE ROUTE - Store Changes to Database (if any) exists-----------------------------
router.put("/:person/:id",middleware.isLoggedIn,middleware.hasAuthority,middleware.addSDC,function(req,res){
    // console.log(req.body);
    var data = {};
    if(req.body.phone){
        data.phone = req.body.phone != '' ? req.body.phone : undefined;
    }
    if(req.body.email && req.body.email != ''){
        data.email = req.body.email;
    }
    if(req.body.firstName && req.body.firstName != ''){
        data.firstName = req.body.firstName;
    }
    if(req.body.middleName){
        data.middleName = req.body.middleName;
    }
    if(req.body.lastName){
        data.lastName = req.body.lastName;
    }
    if(req.body.department && req.body.email != 'None'){
        data.department = req.body.department;
    }
    if(req.body.school && req.body.email != 'None'){
        data.school = req.body.school;
    }

    // Update Age
    if(req.body.age){
        data.age = req.body.age != 'None' ? req.body.age : undefined;
    }

    if(req.body.academicRole){
        data.academicRole = req.body.academicRole;
    }
    if(req.body.regDate){
        data.regDate = req.body.regDate;
    }
    if(req.body.reschTitle){
        data.reschTitle = req.body.reschTitle;
    }

    if(req.body.mode){
        data.mode = req.body.mode;
    }

    if(req.body.phdStatus){
        data.phdCompleted = req.body.phdStatus;
    }

    var i;
    // Update Academic Qualifications (if any)

    if(req.body.academicQ){
        data.academicQ = [];
        for(i = 0; i < req.body.academicQ.degree.length;i++){
            temp = {
                degree        : req.body.academicQ.degree[i] == 'None' || req.body.academicQ.degree[i] == '' ? null : req.body.academicQ.degree[i] ,
                specialisation: req.body.academicQ.specialisation[i] == '' ? null : req.body.academicQ.specialisation[i],
                institute     : req.body.academicQ.institute[i] == '' ? null : req.body.academicQ.institute[i],
                yoc           : req.body.academicQ.yoc[i] == 'None' || req.body.academicQ.degree[i] == '' ? null : req.body.academicQ.yoc[i],
            };
            if(temp.degree || temp.specialisation || temp.institute || temp.yoc){
                data.academicQ.push(temp);
            }
        }
    }
    // console.log(data.academicQ);

    // Update Experience (if any)
    if(req.body.experience){
        data.experience = [];
        for(i = 0; i < req.body.experience.organisation.length;i++){
            temp = {
                organisation: req.body.experience.organisation[i] == '' ? null : req.body.experience.organisation[i],
                designation : req.body.experience.designation[i] == '' ? null : req.body.experience.designation[i],
                role        : req.body.experience.role[i] == '' ? null : req.body.experience.role[i],
                tenure      : req.body.experience.tenure[i] == 'None' ? null : req.body.experience.tenure[i],
            };
            if(temp.organisation || temp.designation || temp.role || temp.tenure){
                data.experience.push(temp);
            }
        }
    }

    // Update Research (if any)
    if(req.body.research){
        data.research = [];
        for(i = 0; i < req.body.research.title.length;i++){

            temp = {
                title   : req.body.research.title[i] == '' ? null : req.body.research.title[i],
                duration: req.body.research.duration[i] == 'None' ? null : req.body.research.duration[i],
                agency  : req.body.research.agency[i] == '' ? null : req.body.research.agency[i],
                role    : req.body.research.role[i] == '' ? null : req.body.research.role[i],
                amount  : req.body.research.amount[i] == '' ? null : req.body.research.amount[i],
            };
            if(temp.title || temp.duration || temp.agency || temp.role || temp.amount){
                data.research.push(temp);
            }
        }
    }

    // Update FoE
    if(req.body.FoE && req.body.FoE.length != 0){
        data.FoE = req.body.FoE.filter(field => field != '');
    }

    // Update Research Title
    if(req.body.reschTitle){
        data.reschTitle = req.body.reschTitle;
    }

    // ADD SDC MEMBER
    if(req.params.person == 'scholar'){
        data.sdcMember = [];
        if(req.Id && req.Id.length != 0 && req.Name && req.Name.length != 0){
            for(i = 0; i < req.Id.length;i++){
                temp = {
                    ID : req.Id[i] != 0 ? req.Id[i] : undefined,
                    name : req.Name[i]
                };
                
                data.sdcMember.push(temp);
            }
        }

    }

    if(req.params.person == "supervisor" && (req.user.isAdmin || req.user.refID == req.params.id)){
        Supervisor.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateSupervisor){
            if(err || !updateSupervisor){
                console.log(err);
                req.flash("error","Could Not Submit,Kindly Try Again!!");
                res.redirect('/supervisor');
            } else {
                req.flash('success','Profile Updated!');
                res.redirect("/supervisor/"+req.params.id);
            }
        });
    } else if(req.params.person == "scholar" && (req.user.isAdmin || req.user.refID == req.params.id)) {
        Scholar.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateScholar){
            if(err || !updateScholar){
                req.flash("error","Could Not Submit,Kindly Try Again!!");  
                res.redirect('/scholar');  
            } else {
                req.flash('success','Profile Updated!');
                res.redirect("/scholar/"+req.params.id);
            }
        });
    } else if(req.params.person == "scholar" && req.user.isSupervisor){
        Scholar.findById(req.params.id, (err,foundSch)=>{
            if(err || !foundSch){
                req.flash('error','No Scholar of that id found');
                res.redirect('/scholar');
            } else if(foundSch.supervisedBy.ID.toString() == req.user.refID){
                Scholar.findByIdAndUpdate(req.params.id,{$set:data},function(err,updateScholar){
                    if(err || !updateScholar){
                        req.flash("error","Could Not Submit,Kindly Try Again!!");  
                        res.redirect('/scholar');  
                    } else {
                        req.flash('success','Profile Updated!');
                        res.redirect("/scholar/"+req.params.id);
                    }
                });
            }
            else{
                req.flash('error','You are not authorized to do that');
                res.redirect('/scholar/'+req.params.id);
            }
        });
    } 
    else{
        req.flash('error','Profile does not exist !');
        res.redirect('/');
    }

    // UPDATE EMAIL ID IN USER MODEL AS WELL ------------> IMPORTANT
    if(req.body.email && req.body.email != '' && req.params.id == req.user.refID && req.body.email != req.user.email){
        User.findByIdAndUpdate(req.user.id,{$set: {email : req.body.email}},function(err,user){
            if(err || !user){
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
            if(err || !supervisor){
                req.flash('error','Could not delete Supervisor');
                res.redirect("/supervisor");
            } else {
                User.findOneAndDelete({refID: req.params.id}, (err,supUser)=>{
                    if(err || !supUser){

                        req.flash('error','Could not remove User. Please delete Manually');
                        res.redirect('/supervisor');
                    } else{
                        req.flash('success','Supervisor has been removed');
                        res.redirect("/supervisor");
                    }
                });  
            }
        });
    } else if(req.params.person == "scholar") {
        Scholar.findByIdAndDelete(req.params.id,function(err,scholar){
            if(err || !scholar){
                req.flash('error','Could not delete Scholar');
                res.redirect("/scholar");  
            } else {
                // REMOVE USER --------->
                User.findOneAndDelete({refID: req.params.id}, (err,schUser)=>{
                    if(err || !schUser){
                        req.flash('error','Could not remove User. Please delete Manually');
                        res.redirect('/scholar');
                    } else{
                        req.flash('success','Scholar has been removed');
                        res.redirect("/scholar");
                    }
                });

                // REMOVE ID ASSOCIATED IN SUPERVISOR
                Supervisor.findOneAndUpdate({_id : scholar.supervisedBy.ID},
                    {$pull: {
                        'schUnder':{
                            ID  : req.params.id,
                        }
                }},function(err,supBy) {
                    if(err || !supBy){
                        console.log(err);
                        console.log('associated supervisor not found');
                        req.flash('error', "associated supervisor not found");
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
    image = {
        imgID : req.file.id,
        imgName : req.file.filename
    };
    if(req.params.person == "supervisor"){
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
                Supervisor.findByIdAndUpdate(req.params.id,{'image': image}, (err,supervisor) =>{
                    if(err || !supervisor){
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
        gfs.delete(new mongoose.Types.ObjectId(req.params.imgid), (err) => {
            if (err) {
                req.flash('error','Image not found!!');
                res.redirect('back');
            }
            else{
            
                Scholar.findByIdAndUpdate(req.params.id,{'image': image}, (err,scholar) =>{
                    if(err || !scholar){
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

//UPLOAD A REPORT

router.post('/:person/:id/report/upload',middleware.isLoggedIn,middleware.checkOwner,middleware.upload.single('report'), (req,res) =>{
    if(req.params.person == 'scholar'){

        Scholar.findByIdAndUpdate(req.params.id,
            {$push: {"report": {
                reportId: req.file.id,
                reportName: req.file.originalname
            }}},
            {safe: true , upsert:true},(err,foundSch)=>{
                if(err || !foundSch){
                    req.flash('error','Scholar not found');
                    res.redirect('back');
                }
                else {
                    req.flash('success', 'Report Uploaded');
                    res.redirect('back');
                }
            });
    } else if(req.params.person == 'supervisor'){
        Supervisor.findByIdAndUpdate(req.params.id,
            {$push: {"report": {
                reportId: req.file.id,
                reportName: req.file.originalname,
                scholarName: req.body.scholar
            }}},
            {safe: true , upsert:true},(err,foundSch)=>{
                if(err || !foundSch){
                    req.flash('error','Scholar not found');
                    res.redirect('back');
                }
                else {
                    req.flash('success', 'Report Uploaded');
                    res.redirect('back');
                }
        });
    } 
    else {
        req.flash('error', 'Could not upload Report!');
        res.redirect('back');
    }
});


//DELETE A REPORT
router.delete('/:person/:id/report/:rid',middleware.isLoggedIn,middleware.checkOwner, (req,res) =>{
    if(req.params.person == 'scholar'){
        Scholar.findByIdAndUpdate(req.params.id,
            {$pull : {
                'report':{
                    reportId: req.params.rid
                }
            }}, (err, foundScholar)=>{
                if(err || !foundScholar){
                    req.flash('err','Report Not Found');
                    res.redirect('back');
                } else{
                    gfs.delete(new mongoose.Types.ObjectId(req.params.rid),(err)=>{
                        if(err){
                            req.flash('error', 'Could not delete Report');
                            res.redirect('back');
                        } else{
                            req.flash('success','Report Removed');
                            res.redirect('back');
                        }
                    });
                }
            });

    } else if(req.params.person == 'supervisor'){
        Supervisor.findByIdAndUpdate(req.params.id,
            {$pull : {
                'report':{
                    reportId: req.params.rid
                }
            }}, (err, foundScholar)=>{
                if(err || !foundScholar){
                    req.flash('err','Report Not Found');
                    res.redirect('back');
                } else{
                    gfs.delete(new mongoose.Types.ObjectId(req.params.rid),(err)=>{
                        if(err){
                            req.flash('error', 'Could not delete Report');
                            res.redirect('back');
                        } else{
                            req.flash('success','Report Removed');
                            res.redirect('back');
                        }
                    });
                }
            });
    }
    else {
        req.flash('error', 'Could not remove Report!');
        res.redirect('back');
    }
});



module.exports = router;