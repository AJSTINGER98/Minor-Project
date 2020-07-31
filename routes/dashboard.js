const express    = require("express"),
	  middleware = require("../middleware/middleware"),
      router     = express.Router();


// IMPORT MODELS
const Supervisor = require("../models/supervisor"),
	  Form       = require("../models/form"),
	  Drc		 = require('../models/drc'),
	  Schedule	 = require('../models/schedule');
//HOMEPAGE

router.get("/", (req,res) =>{
	Drc.find({},(err,foundDrc) =>{
		if(err){
			console.log(err);
			foundDrc = [];
		}
		
		if(req.isAuthenticated()){  
			Form.find({},(err,formList) =>{
				if(err){
					console.log('Error while finding Form');
					formList = [];
				} 
				Schedule.find({},(err,sched)=>{
					if(err){
						console.log('Error while adding schedule');
						sched = [];
					}
					scheduleArr = [];
					if(req.user.isAdmin){
						scheduleArr = sched;
					} else {
						if(req.user.isSupervisor && sched.length >0){
							sched.forEach(schedule =>{
								if(schedule.supervisedBy && schedule.supervisedBy.ID && schedule.supervisedBy.ID.toString() == req.user.refID.toString()){
									scheduleArr.push(schedule);
								} else if(schedule.cosupervisor && schedule.cosupervisor.ID && schedule.cosupervisor.ID.toString() == req.user.refID.toString()){
									scheduleArr.push(schedule);
								} else if(schedule.sdcMember && schedule.sdcMember.length != 0){
									
									for(var i=0;i<schedule.sdcMember.length;i++){
										
										if(schedule.sdcMember[i].ID && schedule.sdcMember[i].ID.toString() == req.user.refID.toString()){
											scheduleArr.push(schedule);
											break;
										}
									}
									
								}
							});
						} else  if(sched.length > 0){
							sched.forEach(schedule =>{
								if(schedule.ID && schedule.ID.toString() == req.user.refID.toString()){
									scheduleArr.push(schedule);
								}
							});
						}
					}
					
					res.render('home',{files:formList, drc : foundDrc[0], scheduleData: scheduleArr});
					
				});
				
			});
		} else { 
			res.render('home',{drc : foundDrc[0]});
		}
		
	});
});

router.delete('/:id',middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
	Drc.findByIdAndDelete({_id : req.params.id},(err,drcComm) =>{
		if(err || !drcComm){
			req.flash('error',"Cannot Delete Table!!");
			res.redirect('/');
		} else{
			req.flash('success','DRC Table Deleted Successfully!!');
			res.redirect('/');
		}
	});
});

module.exports = router;