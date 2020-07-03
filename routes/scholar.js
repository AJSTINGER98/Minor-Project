const express       = require("express"),
      router        = express.Router(),
      nodemailer    = require('nodemailer'),
      mongoose      = require('mongoose'),
      middleware    = require("../middleware/middleware");

// IMPORT MODEL
const Supervisor = require("../models/supervisor"),
      Scholar    = require("../models/scholar"),
      User       = require("../models/user");

// INDEX ROUTE - Show All Scholars
router.get("/",(req,res) =>{
    Scholar.find({},function(err, allscholar){
		if(err){
            req.flash('error',"Something went wrong, Please Try Again!!");
            console.log(err);
            res.redirect('back');
		}
		else{
            scholarList = [];
            allscholar.forEach((scholar)=>{
                temp = {
                    _id        : scholar._id,
                    scID       : scholar.scID,
                    firstName  : scholar.firstName,
                    middleName : scholar.middleName,
                    lastName   : scholar.lastName,
                    department : scholar.department,
                    supervisor : scholar.supervisedBy.supBy,
                    email      : scholar.email
                };
                scholarList.push(temp);
            });
            if(req.user &&  req.user.isAdmin){
                Supervisor.find({},'_id title firstName lastName',function (err,allsupervisor) {
                    if(err){
                        req.flash('error','Something Went Wrong, Please Refresh The Page!!');
                        console.log(err);
                    }
                    res.render("scholar",{scholar : scholarList, supervisor : allsupervisor});
                });   
            } else{
                res.render("scholar",{scholar : scholarList, supervisor : {}});
            }
            
            
		}
	});
});

// CREATE ROUTE - Add Scholar to database
router.post("/",middleware.addSDC,(req,res) =>{
    // ,middleware.isLoggedIn,middleware.isAdmin
    var supBy   = req.body.scholar.supByID,
        cosupBy = req.body.scholar.cosupID;
    var bool = true;

    Supervisor.findById({_id: supBy}, function(err,foundSupervisor) {
        if(err || !foundSupervisor){
            console.log(err);
            req.flash('error',"Either Supervisor doesn't Exists or has been moved somewhere else!!");
        }

        else {
            Supervisor.findById({_id: cosupBy}, function(err,foundcoSupervisor) {
                try{
                    if(mongoose.Types.ObjectId.isValid(cosupBy))
                        bool = true;
                } catch(error){
                    if(cosupBy == 'None')
                        bool = false;
                    else{
                        req.flash('error',"Either Co-Supervisor doesn't Exists or has been moved somewhere else!!");
                    }
                }
                var Id   = req.Id,
                    Name = req.Name;

                Scholar.find({},function(err,scholar){
                    if(err){
                        req.flash("error","Something went wrong,Pleaase Try Again!!");
                        console.log(err);
                    } else {
                        var Sch = req.body.scholar;
                        schData = {
                            scID         : Sch.scID,
                            image        : undefined,
                            title        : Sch.title,
                            firstName    : Sch.firstName.trim(),
                            middleName   : Sch.middleName ? Sch.middleName : "",
                            lastName     : Sch.lastName.trim(),
                            email        : Sch.email.trim(),
                            phone        : Sch.phone,
                            department   : Sch.department,
                            school       : Sch.school,
                            supervisedBy : {
                                ID    : foundSupervisor._id,
                                supBy : undefined
                            },
                            cosupervisor : {
                                ID    : undefined,
                                cosup : undefined
                            },
                            mode         : Sch.mode,
                            regDate      : Sch.regDate,
                            reschTitle   : Sch.reschTitle,
                            sdcMember    : [],
                            report       : [],
                        };

                        // SUPERVISED BY
                        if(foundSupervisor.middleName == null)
                            schData.supervisedBy.supBy = `${foundSupervisor.title} ${foundSupervisor.firstName} ${foundSupervisor.lastName}`;
                        else
                            schData.supervisedBy.supBy = `${foundSupervisor.title} ${foundSupervisor.firstName} ${foundSupervisor.middleName} ${foundSupervisor.lastName}`;
                        
                        // CO-SUPERVISED BY
                        if(cosupBy != 'None'){
                            schData.cosupervisor.ID = foundcoSupervisor._id;
                            if(foundcoSupervisor.middleName == null)
                            schData.cosupervisor.cosup = `${foundcoSupervisor.title} ${foundcoSupervisor.firstName} ${foundcoSupervisor.lastName}`;
                        else
                            schData.cosupervisor.cosup = `${foundcoSupervisor.title} ${foundcoSupervisor.firstName} ${foundcoSupervisor.middleName} ${foundcoSupervisor.lastName}`;
                        }

                        // ADD SDC MEMBER
                        for(var i = 0; i < Id.length;i++){
                            temp = {
                                ID : Id[i],
                                name : Name[i]
                            };
                            
                            schData.sdcMember.push(temp);
                        }

                        // ADD CONTENT TO DATABASE
                        Scholar.create(schData, (err,scholar) => {
                            if(err || !scholar){
                                console.log(err);
                                req.flash("error","Something went Wrong,Please Try Again!!!");
                            }
                            else{
                                // CREATE A SCHOLAR ACCOUNT
                                const password = `${scholar.firstName.toLowerCase()}#${scholar.scID}@sc`;
                                
                                User.register(new User({
                                    username: `${scholar.firstName.toLowerCase()}${scholar.scID}@sc`,
                                    email: scholar.email,
                                    isAdmin: false,
                                    isSupervisor: false,
                                    refID: scholar._id,
                                }),password,(err,user) =>{
                                    if(err || !user){
                                        console.log(err);
                                        req.flash('error', 'Unable to Sign Up');
                                        return res.redirect('/scholar');
                                    } else {
    
                                        //SEND EMAIL TO SCHOLAR
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
                                        //     text: `Dear ${scholar.firstName},\n\n` +
                                        //           'Your account in PhD Portal associated with Manipal University Jaipur has been created succesfully.\n'+
                                        //           `Your account details are as follows:\n\n Username: ${user.username}\n Password: ${password}`+
                                        //           '\n\nIt is recommended that you change your password once you have logged in.'+
                                        //           '\n\nThanks& Regards\nPhD Portal (MUJ)'
                                        // };
                                        // smtpTransport.sendMail(mailOptions, function(err,info) {
                                        //     if(err || !info){
                                        //         req.flash("warning","Could not send email. Please send manually !!");
                                                
                                        //     } else{
                                        //         req.flash("success","Email has been sent");
                                        //     }
                                        // });
                                        req.flash("success","Entity Added Successfully...");
                                        res.redirect("/scholar");
                                    }
                                });
    
                                // ADD SCHOLARS ASSOCIATED TO SUPERVISORS in SUPERVISOR DB
                                Supervisor.findByIdAndUpdate(foundSupervisor._id,
                                    {$push: {
                                        'schUnder':{
                                            ID  : scholar._id,
                                            sch : scholar.middleName == ''? `${scholar.firstName} ${scholar.lastName}` : `${scholar.firstName} ${scholar.middleName} ${scholar.lastName}`
                                        }
                                    }},{safe: true , upsert:true},function(err,updatedSupervisor){
                                    if(err || !updatedSupervisor){
                                        req.flash('error', 'Something went wrong');
                                    }
                                });
                            }
    
                        });
                    }
                });
                
            });
        } 
    });
});

module.exports = router;