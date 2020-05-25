const express = require("express"),
      router  = express.Router(),
      middleware = require("../middleware/middleware");

// IMPORT MODEL
const Scholar = require("../models/scholar");
const User = require("../models/user");

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
            // console.log(scholarList);
            res.render("scholar",{scholar : scholarList});
		}
	});
});

// CREATE ROUTE - Add Scholar to database
router.post("/",middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
    // console.log(req.body);
    // console.log(req.body.scholar);
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
                academicQ: [],
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
                    // req.flash("success","Entity Added Successfully...");
                    // res.redirect("/scholar");
                }
            });
        }
    });
});

module.exports = router;