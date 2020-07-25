const express    = require("express"),
      router     = express.Router(),
      nodemailer = require('nodemailer'),
      middleware = require("../middleware/middleware");

//IMPORT MODEL
const Supervisor = require("../models/supervisor"),
      User       = require('../models/user');

// INDEX ROUTE - Show all Supervisors
router.get("/",(req,res)=>{

    Supervisor.find({},function(err, allsupervisor){
		if(err){
            req.flash('error',"Something went wrong, Please Try Again!!");
            console.log(err);
            res.redirect('back');
		} else {
            supervisorList = [];
            allsupervisor.forEach((supervisor)=>{
                temp = {
                    _id: supervisor._id,
                    spID : supervisor.spID,
                    title : supervisor.title,
                    firstName : supervisor.firstName,
                    middleName: supervisor.middleName,
                    lastName : supervisor.lastName,
                    academicRole : supervisor.academicRole,
                    department: supervisor.department,
                    email : supervisor.email,
                };
                supervisorList.push(temp);
            });

            res.render("supervisor",{supervisor : supervisorList});
		}
	});
});

// CREATE ROUTE - Add Supervisor 
router.post("/", middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{
    // eval(require('locus')); 
    // console.log(req.body);
   
    var Sup = req.body.supervisor;
    supData = {
        spID: Sup.spID,
        image: undefined,
        title: Sup.title,
        firstName: Sup.firstName.trim(),
        middleName: Sup.middleName ? Sup.middleName.trim() : "",
        lastName: Sup.lastName.trim(),
        email: Sup.email.trim(),
        phone: Sup.phone,
        age: Sup.age == 'None' || Sup.age == undefined ? undefined : Sup.age,
        academicRole: Sup.academicRole,
        department: Sup.department,
        school: Sup.school,
        academicQ: [],
        experience: [],
        research: [], 
        FoE: Sup.FoE ? Sup.FoE.filter(field => field != "") : [],
    };

    var i;
    // Create array of object of Academic Qualifications
    if(Sup.academicQ){
        for(i = 0; i < Sup.academicQ.degree.length;i++){
            temp = {
                degree        : Sup.academicQ.degree[i] == 'None' || Sup.academicQ.degree[i] == '' ? null : Sup.academicQ.degree[i] ,
                specialisation: Sup.academicQ.specialisation[i] == '' ? null : Sup.academicQ.specialisation[i],
                institute     : Sup.academicQ.institute[i] == '' ? null : Sup.academicQ.institute[i],
                yoc           : Sup.academicQ.yoc[i] == 'None' || Sup.academicQ.degree[i] == '' ? null : sup.academicQ.yoc[i],
            };
            if(temp.degree || temp.specialisation || temp.institute || temp.yoc){
                supData.academicQ.push(temp);
            }
        }

    }
    if(Sup.experience){
        // Create array of object of Experiences
        for(i = 0; i < Sup.experience.organisation.length;i++){
            temp = {
                organisation: Sup.experience.organisation[i] == '' ? null : Sup.experience.organisation[i],
                designation : Sup.experience.designation[i] == '' ? null : Sup.experience.designation[i],
                role        : Sup.experience.role[i] == '' ? null : Sup.experience.role[i],
                tenure      : Sup.experience.tenure[i] == 'None' ? null : Sup.experience.tenure[i],
            };
            if(temp.organisation || temp.designation || temp.role || temp.tenure){
                supData.experience.push(temp);
            }
        }
    }

    if(Sup.research){
        // Create array of object of Research
        for(i = 0; i < Sup.research.title.length;i++){
            temp = {
            title   : Sup.research.title[i] == '' ? null : Sup.research.title[i],
            duration: Sup.research.duration[i] == 'None' ? null : Sup.research.duration[i],
            agency  : Sup.research.agency[i] == '' ? null : Sup.research.agency[i],
            role    : Sup.research.role[i] == '' ? null : Sup.research.role[i],
            amount  : Sup.research.amount[i] == '' ? null : Sup.research.amount[i],
            };
            if(temp.title || temp.duration || temp.agency || temp.role || temp.amount){
                supData.research.push(temp);
            }
        }

    }

    // ADD CONTENT TO DATABASE
    Supervisor.create(supData, (err,supervisor) => {
        if(err || !supervisor){
            console.log(err);
            req.flash("error","Something went Wrong,Please Try Again!!!");
        } else {
            // CREATE A SUPERVISOR ACCOUNT
            const password = `${supervisor.firstName.toLowerCase()}#${supervisor.spID}`;

            User.register(new User({
                username: supervisor.firstName.toLowerCase() + supervisor.spID,
                email: supervisor.email,
                isAdmin: false,
                isSupervisor: true,
                refID: supervisor._id,
            }),password,(err,user) =>{
                if(err || !user){
                    req.flash('error', 'Unable to Sign Up');
                    return res.redirect('/supervisor');
                } else {
                    
                    // SEND EMAIL TO  
                    // var smtpTransport = nodemailer.createTransport({
                    //     service: 'Gmail', 
                    //     auth: {
                    //         user: 'phdportal1131@gmail.com',
                    //         pass: process.env.GMAILPW
                    //     }
                    //     });
                    // var mailOptions = {
                    //     to: user.email,
                    //     from: 'phdportal1131@gmail.com',
                    //     subject: 'Phd Portal || Your Account has been Created',
                    //     text:   `Dear ${supervisor.firstName},\n\n` +
                    //             'Your account in PhD Portal associated with Manipal University Jaipur has been created succesfully.\n'+
                    //             `Your account details are as follows:\n\n Username: ${user.username}\n Password: ${password}`+
                    //             '\n\nIt is recommended that you change your password once you have logged in.'+
                    //             '\n\nThanks& Regards\nPhD Portal (MUJ)'
                    // };
                    // smtpTransport.sendMail(mailOptions, function(err,info) {
                    //     if(err || !info){
                    //         req.flash("warning","Entity Added !! Could not send email. Please send manually !!");

                    //     } else{
                    //         req.flash("success","Entity Added !! Email has been sent");
                    //     }
                    // });
                    req.flash("success","Entity Added Successfully...");
                    res.redirect("/supervisor");
                }
            });
            
        }
    });

});

module.exports = router;