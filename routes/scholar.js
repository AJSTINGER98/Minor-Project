const express = require("express"),
      router  = express.Router(),
      middleware = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor");
const Scholar    = require("../models/scholar");
const User       = require("../models/user");

// INDEX ROUTE - Show All Scholars
router.get("/",(req,res) =>{
    Scholar.find({},function(err, allscholar){
		if(err){
            req.flash('error',"Something went wrong, Please Try Again!!");
			console.log(err);
		}
		else{
            scholarList = [];
            allscholar.forEach((scholar)=>{
                temp = {
                    _id: scholar._id,
                    scID : scholar.scID,
                    firstName : scholar.firstName,
                    lastName : scholar.lastName,
                    age: scholar.age,
                    department: scholar.department,
                    email : scholar.email
                };
                scholarList.push(temp);
            });
            Supervisor.find({},'_id title firstName lastName',function (err,allsupervisor) {
                if(err){
                    req.flash('error','Something Went Wrong, Please Refresh The Page!!');
                    console.log(err);
                }
                res.render("scholar",{scholar : scholarList, supervisor : allsupervisor});
            });   
            // console.log(scholarList);
            
		}
	});
});

// CREATE ROUTE - Add Scholar to database
router.post("/",middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
    // console.log(req.body.scholar);
    Supervisor.findById({_id: req.body.scholar.supByID},function (err,foundSupervisor) {
        if(err){
            console.log(err);
            req.flash('error',"Either Supervisor doesn't Exists or has been moved somewhere else!!");
        }
        else{
            Scholar.find({},function(err,scholar){
                if(err){
                    req.flash("error","Something went wrong,Pleaase Try Again!!");
                    console.log(err);
                } else {
                    var id;
                    if(scholar.length == 0){
                        id=1;
                    } else {
                        id = scholar[scholar.length-1].scID + 1;
                    }
                    var Sch = req.body.scholar;
                    schData = {
                        scID: id,
                        image: undefined,
                        title: Sch.title,
                        firstName: Sch.firstName.trim(),
                        lastName: Sch.lastName.trim(),
                        email: Sch.email.trim(),
                        phone: Sch.phone,
                        age: Sch.age,
                        department: Sch.department,
                        school: Sch.school,
                        supervisedBy : {
                            ID    : foundSupervisor._id,
                            supBy : `${foundSupervisor.title}${foundSupervisor.firstName} ${foundSupervisor.lastName}`
                        },
                        academicQ: [],
                        report: [],
                    };
        
                    //Create array of object of Academic Qualifications
                    for(var i = 0; i < Sch.academicQ.degree.length;i++){
                        temp = {
                            degree: Sch.academicQ.degree[i],
                            specialisation: Sch.academicQ.specialisation[i],
                            institute: Sch.academicQ.institute[i],
                            yoc: Sch.academicQ.yoc[i],
                        };
                        schData.academicQ.push(temp);
                    }

                    // ADD CONTENT TO DATABASE
                    Scholar.create(schData, (err,scholar) => {
                        if(err){
                            console.log(err);
                            req.flash("error","Something went Wrong,Please Try Again!!!");
                        }
                        else{
                            // CREATE A SCHOLAR ACCOUNT
                            const password = `${scholar.firstName}#${scholar.scID}@sc`;
                            // console.log(password);
                            User.register(new User({
                                username: `${scholar.firstName}${scholar.scID}@sc`,
                                email: scholar.email,
                                isAdmin: false,
                                isSupervisor: false,
                                refID: scholar._id,
                            }),password,(err,user) =>{
                                if(err){
                                    req.flash('error', 'Unable to Sign Up');
                                    return res.redirect('/scholar');
                                } else {
                                    req.flash("success","Entity Added Successfully...");
                                    res.redirect("/scholar");
                                }
                            });

                            // ADD SCHOLARS ASSOCIATED TO SUPERVISORS in SUPERVISOR DB
                            Supervisor.findByIdAndUpdate(foundSupervisor._id,
                                {$push: {
                                    'schUnder':{
                                        ID  : scholar._id,
                                        sch : `${scholar.firstName} ${scholar.lastName}`
                                    }
                                }},{safe: true , upsert:true},function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                        }

                    });
                }
            });
        } 
    });
});

module.exports = router;