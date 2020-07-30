const express       = require("express"),
      router        = express.Router(),
      mongoose      = require('mongoose'),
      middleware    = require("../middleware/middleware");


// IMPORT MODEL
const Scholar       = require("../models/scholar");
const Schedule      = require("../models/schedule");

router.get('/',middleware.isLoggedIn,middleware.isAdmin,(req,res)=>{
    Scholar.find({},(err,allScholar)=>{
        if(err || allScholar.length == 0){
            req.flash('error','No Scholar Data Available');
            res.redirect('/');
        } else{
            Schedule.find({},(err,allSchedule)=>{
                if(err){
                    req.flash('error','Something went wrong');
                    res.redirect('back');
                } else{
                    res.render('scheduleForm',{scholarData : allScholar,scheduleData : allSchedule});
                }
            });
        }
    });
});

router.post('/',middleware.isLoggedIn,middleware.isAdmin,(req,res)=>{
    scholarData = [];
    var i;
    for(i=0;i<req.body.scholarID.length;i++){
        temp = {
            scholarID : req.body.scholarID[i],
            presentation1 : req.body.presentation1[i],
            presentation2 : req.body.presentation2[i],
            finalReport : req.body.finalReport[i],
        };
        scholarData.push(temp);
    }
    var scheduleData = [];
    var count = 0;
    scholarData.forEach((scholar)=>{
        Scholar.findById(scholar.scholarID,(err,foundScholar)=>{
            if(err || !foundScholar){
                console.log('Scholar Not Found');
                count++;
            } else {
                var temp = {
                    ID             : foundScholar._id,
                    scholarDetails : {
                        scID         : foundScholar.scID,
                        title        : foundScholar.title,
                        firstName    : foundScholar.firstName,
                        middleName   : foundScholar.middleName,
                        lastName     : foundScholar.lastName,
                        department   : foundScholar.department,
                        mode         : foundScholar.mode,
                        reschTitle   : foundScholar.reschTitle,
                    },
                    supervisedBy : {
                        ID      : foundScholar.supervisedBy.ID,
                        supBy   : foundScholar.supervisedBy.supBy,
                    },
                    presentation: {
                        first : scholar.presentation1,
                        second : scholar.presentation2,
                        final : scholar.finalReport,
                    },

                };
                if(foundScholar.sdcMember && foundScholar.sdcMember.length != 0){
                    temp.sdcMember = foundScholar.sdcMember;
                }

                if(foundScholar.cosupervisor && foundScholar.cosupervisor.cosup != ''){
                    temp.cosupervisor = foundScholar.cosupervisor;
                }
                scheduleData.push(temp);
                count++;
                if(count == scholarData.length){
                    console.log(scheduleData);
                    Schedule.create(scheduleData,function(err,data){
                        if(err){
                            console.log(err);
                            req.flash('error','Schedule Could not be added');
                            res.redirect('back');
                        } else{
                            console.log('All Data Added');
                            res.redirect('back');
                        }
                    });
                }
            }
        });
    });
});

router.delete('/:id',middleware.isLoggedIn,middleware.isAdmin,(req,res)=>{
    Schedule.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            req.flash('error','Could not delete Schedule');
            res.redirect('back');
        } else{
            req.flash('success','Schedule has been Deleted');
            res.redirect('back');
        }
    });
});



module.exports = router;