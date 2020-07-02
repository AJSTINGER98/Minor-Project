const express    = require('express'),
      middleware = require("../middleware/middleware"), 
      mongoose   = require("mongoose");

const router = express.Router();

const Supervisor   = require('../models/supervisor');
const Scholar      = require('../models/scholar');
const User      = require('../models/user');

const school = {
    'CSE' : 'School of Computing & Information Technology',
    'IT' : 'School of Computing & Information Technology',
    'CCE' : 'School of Computing & Information Technology'
};

router.get('/',middleware.isLoggedIn,middleware.isAdmin, (req,res) =>{
    
        res.render('seeds');
});

router.post('/upload/:person',middleware.isLoggedIn,middleware.isAdmin,(req,res) =>{

    keyArr = Object.keys(req.body[0]);
    if(req.params.person == 'supervisor'){
        var supData = {};
        req.body.forEach( supervisor =>{
            var i = 0;
            supData.spID = supervisor[keyArr[i++]];
            supData.image = undefined;
            supData.title = 'Dr.';
            
            //split and filter Name
            nameArr = supervisor[keyArr[i++]].split(' ');
            nameArr = nameArr.filter(e => e !== 'Dr' && e !== 'Dr.');

            supData.firstName = nameArr[0].trim();
            supData.lastName = nameArr[nameArr.length-1].trim();
            if(nameArr.length > 2){
                supData.middleName = nameArr[1].trim();
            } else {
                supData.middleName = "";
            }
            supData.academicRole = supervisor[keyArr[i++]];
            supData.department = supervisor[keyArr[i++]];
            supData.school = school[supData.department];
            FoE = supervisor[keyArr[i++]].replace('and',',').split(',').map(Function.prototype.call, String.prototype.trim);
            supData.FoE = FoE;
            supData.phone = supervisor[keyArr[i++]];
            supData.email = supervisor[keyArr[i++]];
            supData.academicQ = [];
            supData.experience = [];
            supData.research = [];
            
            // ADD CONTENT TO DATABASE
            Supervisor.create(supData, (err,supervisor) => {
                if(err || !supervisor){
                    console.log(err);
                    return res.json({status:'error'});
                } else {
                    // CREATE A SUPERVISOR ACCOUNT
                    console.log(`${supervisor.firstName} Sup Added`);
                    const password = `${supervisor.firstName.toLowerCase()}#${supervisor.spID}`;
        
                    User.register(new User({
                        username: supervisor.firstName.toLowerCase() + supervisor.spID,
                        email: supervisor.email,
                        isAdmin: false,
                        isSupervisor: true,
                        refID: supervisor._id,
                    }),password,(err,user) =>{
                        if(err || !user){
                            
                            return res.json({status:'error'});
                        } else {
                            console.log(`${supervisor.firstName} User Added`);
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
                        }
                    });
                    
                }
            });
        });
        
        return res.json({status : 'success'});

    } else if(req.params.person == 'scholar'){
        return res.json({status : 'error'});
    } else {
        return res.json({status : 'error'});
    }
});

module.exports = router;
