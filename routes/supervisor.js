const express = require("express");
const router = express.Router();

//Import models
const supervisor = require("../models/supervisor");


router.get("/",(req,res)=>{
    supervisor.find({},function(err, supervisors){
		if(err){
			console.log(err);
		}
		else{
            // console.log(supervisors);
            supervisorList = [];
            supervisors.forEach( (supervisor) => {
                temp = {
                    _id: supervisor._id,
                    spID : supervisor.spID,
                    firstName : supervisor.firstName,
                    lastName : supervisor.lastName,
                    age: supervisor.age,
                    department: supervisor.department,
                    FoE : supervisor.FoE,
                };
                supervisorList.push(temp);
            });
            // console.log(supervisorList);
            res.render("supervisor",{supervisor:supervisorList});
            // res.render("supervisor",{ supervisor: supervisor});
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
            // console.log(req.body.supervisor);
            var Sup = req.body.supervisor;
            supData = {
                spID: id,
                firstName: Sup.firstName ,
                lastName: Sup.lastName,
                email: Sup.email,
                phone: Sup.phone,
                age: Sup.age,
                academicRole: Sup.academicRole,
                department: Sup.department,
                school: Sup.school,
                academicQ: [],
                experience: [],
                research: [], 
                FoE: Sup.FoE,
            };

            //create array of object of academic Qualifications

            for(var i = 0; i < Sup.academicQ.degree.length;i++){
                temp = {
                    degree: Sup.academicQ.degree[i],
                    specialisation: Sup.academicQ.specialisation[i],
                    institute: Sup.academicQ.institute[i],
                    yoc: Sup.academicQ.yoc[i],
                };
                // console.log(temp);
                supData.academicQ.push(temp);
            }
            //create array of object of experiences

            for(i = 0; i < Sup.experience.organisation.length;i++){
                temp = {
                    organisation: Sup.experience.organisation[i],
                    designation: Sup.experience.designation[i],
                    role: Sup.experience.role[i],
                    tenure: Sup.experience.tenure[i],
                };
                // console.log(temp);
                supData.experience.push(temp);
            }

            //create array of object of Research

            for(i = 0; i < Sup.research.title.length;i++){
                temp = {
                    title: Sup.research.title[i],
                    duration: Sup.research.duration[i],
                    agency: Sup.research.agency[i],
                    role: Sup.research.role[i],
                    amount: Sup.research.amount[i],
                };
                supData.research.push(temp);
            }



            // console.log(supData);
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