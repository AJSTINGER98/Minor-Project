const express = require("express");
const router = express.Router();

// -------------MULTER CONFIG -------------------- //
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './utilities/Profile_Picture/');
    },
    filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter}).single('image');
// The Parameter passed inside single should be the same as the "name" of input field "file"
// ----------------------------------------------- //

//IMPORT MODEL
const Supervisor = require("../models/supervisor");

// INDEX ROUTE - Show all Supervisors
router.get("/",(req,res)=>{
    Supervisor.find({},function(err, allsupervisor){
		if(err){
            req.flash('error',"Something went wrong, Please Try Again!!");
			console.log(err);
		}
		else{
            supervisorList = [];
            allsupervisor.forEach((supervisor)=>{
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
            res.render("supervisor",{supervisor : supervisorList});
		}
	});
});

// CREATE ROUTE - Add Supervisor to database
router.post("/", (req,res) =>{
    // eval(require('locus')); 
    console.log(req.body.supervisor);
    upload(req,res,function(err){
        if(err){
            req.flash("error",err.message);
            console.log(err);
        }
    Supervisor.find({},function(err,supervisor){
        if(err){
            req.flash("error","Something went wrong,Pleaase Try Again!!");
            console.log(err);
        } else {
            var id;
            if(supervisor.length == 0){
                id=1;
            } else {
                id = supervisor[supervisor.length-1].spID + 1;
            }
            var Sup = req.body.supervisor;
            supData = {
                spID: id,
                image: "Profile_Picture/"+req.file.filename,
                title: Sup.title,
                firstName: Sup.firstName,
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

            //Create array of object of Academic Qualifications
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

            //Create array of object of Experiences
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
                // console.log(temp)
                supData.research.push(temp);
            }

            // ADD CONTENT TO DATABASE
            Supervisor.create(supData, (err,supervisor) => {
                if(err){
                    console.log(err);
                    req.flash("error","Something went Wrong,Please Try Again!!!");
                }
                else{
                    req.flash("success","Entity Added Successfully...")
                    res.redirect("/supervisor");
                }
            });
		}
    });
});
});

module.exports = router;