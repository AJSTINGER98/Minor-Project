const express    = require('express'),
      middleware = require("../middleware/middleware"), 
      mongoose   = require("mongoose");

const router = express.Router();

const Supervisor   = require('../models/supervisor');
const Scholar      = require('../models/scholar');
const User         = require('../models/user');
const Drc          = require('../models/drc');

const school = {
    'Computer Science & Engineering(CSE)' : 'School of Computing & Information Technology',
    'Information Technology(IT)' : 'School of Computing & Information Technology',
    'Computer and Communication Engineering(CCE)' : 'School of Computing & Information Technology'
};

const dep = {
    'CSE': 'Computer Science & Engineering(CSE)',
    'IT' : 'Information Technology(IT)',
    'CCE': 'Computer and Communication Engineering(CCE)'
};

router.get('/', middleware.isLoggedIn, middleware.isAdmin, (req,res) =>{
    
        res.render('seeds');
});

router.post('/upload/:person',middleware.isLoggedIn, middleware.isAdmin,(req,res) =>{

    try{
        var keyArr = Object.keys(req.body[0]);
        if(req.params.person == 'supervisor'){
            var supData = {};
            req.body.forEach( supervisor =>{
                var i = 0;
                supData.spID = supervisor[keyArr[i++]];
                supData.image = undefined;
                supData.title = 'Dr.';
                
                //split and filter Name
                nameArr = supervisor[keyArr[i++]].trim().split(' ').filter(e=>e != '');
                nameArr = nameArr.filter(e => e !== 'Dr' && e !== 'Dr.');
    
                supData.firstName = nameArr[0].trim();
                supData.lastName = nameArr[nameArr.length-1].trim();
                if(nameArr.length > 2){
                    supData.middleName = nameArr[1].trim();
                } else {
                    supData.middleName = "";
                }
                supData.academicRole = supervisor[keyArr[i++]];
                supData.department = dep[supervisor[keyArr[i++]]];
                supData.school = school[supData.department];
                FoE = supervisor[keyArr[i++]].replace('and',',').split(',').map(Function.prototype.call, String.prototype.trim);
                supData.FoE = FoE;
                supData.phone = supervisor[keyArr[i++]];
                supData.email = supervisor[keyArr[i++]].trim();
                supData.academicQ = [];
                supData.experience = [];
                supData.research = [];
                console.log(supData);
                // ADD CONTENT TO DATABASE
                Supervisor.create(supData, (err,supervisor) => {
                    if(err || !supervisor){
                        console.log(err);
                        return res.json({status:'error'});
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
                                
                                return res.json({status:'error'});
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
                            }
                        });
                        
                    }
                });
            });
            
            return res.json({status : 'success'});
    
        } else if(req.params.person == 'scholar'){
        
            req.body.forEach(scholar =>{
                var schData = {};
                var i = 1;
                var supNameArr = scholar[keyArr[i++]].trim().split(' ').filter(e=>e != '');
                var coSupNameArr = scholar[keyArr[i]] ? scholar[keyArr[i++]].trim().split(' ').filter(e=>e != ''): [];
                var midName = supNameArr.length >3 ? supNameArr[2] : '';
                // console.log(supNameArr);
                Supervisor.findOne({firstName : supNameArr[1], middleName: midName, lastName : supNameArr[supNameArr.length -1]}, (err, foundSupervisor)=>{
                    if(err || !foundSupervisor){
                        console.log('Could not find Supervisor');
                    } else{
                        schData.supervisedBy = {ID: foundSupervisor._id, supBy: `${supNameArr.join(' ')}`};
                        if(coSupNameArr.length == 0){
                            fName = null;
                            midName = null;
                            lName = null;
                            i++;
                        } else{
                            fName = coSupNameArr[1];
                            midName = coSupNameArr.length > 3 ? coSupNameArr[2] : '';
                            lName = coSupNameArr[coSupNameArr.length -1];
                        }
                        
                        Supervisor.findOne({firstName : fName, middleName: midName, lastName : lName}, (err,foundCoSup)=>{
                            if(err || !foundCoSup ){
                                schData.cosupervisor = {ID : undefined, cosup: `${coSupNameArr.join(' ')}`};
                            } else{
                                schData.cosupervisor = {ID : foundCoSup._id, cosup: `${coSupNameArr.join(' ')}`};
    
                            }
                    
                            nameArr = scholar[keyArr[i++]].split(' ').filter(e=>e != '');
                            schData.title = nameArr[0];
                            schData.firstName = nameArr[1];
                            schData.middleName = nameArr.length > 3 ? nameArr[2] : '';
                            schData.lastName = nameArr[nameArr.length-1];
                            schData.mode = scholar[keyArr[i++]].trim();
                            schData.scID = scholar[keyArr[i++]];
                            var dt = new Date(1900,0,0);
                            dt.setDate(dt.getDate()-1 + scholar[keyArr[i++]]);
                            schData.regDate = dt;
                            schData.reschTitle = scholar[keyArr[i++]];
                            schData.email = scholar[keyArr[i++]].trim();
                            i++;
                            schData.phone = scholar[keyArr[i++]];
                            schData.sdcMember = [];
                            schData.report = [];
                            schData.department = foundSupervisor.department;
                            schData.school = school[schData.department];
                            // console.log(schData);
                            // ADD CONTENT TO DATABASE
                            Scholar.create(schData, (err,scholarData) => {
                                if(err || !scholarData){
                                    console.log('Could not add scholar');
                                    
                                }
                                else{
                                    // CREATE A SCHOLAR ACCOUNT
                                    const password = `${scholarData.firstName.toLowerCase()}#${scholarData.scID}@sc`;
                                    
                                    User.register(new User({
                                        username: `${scholarData.firstName.toLowerCase()}${scholarData.scID}@sc`,
                                        email: scholarData.email,
                                        isAdmin: false,
                                        isSupervisor: false,
                                        refID: scholarData._id,
                                    }),password,(err,user) =>{
                                        if(err || !user){
                                            console.log('Could not create User');
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
                                            
                                            console.log('Scholar Added');
                                        }
                                    });
        
                                    // ADD SCHOLARS ASSOCIATED TO SUPERVISORS in SUPERVISOR DB
                                    Supervisor.findByIdAndUpdate(foundSupervisor._id,
                                        {$push: {
                                            'schUnder':{
                                                ID  : scholarData._id,
                                                sch : `${scholarData.firstName} ${scholarData.middleName} ${scholarData.lastName}`
                                            }
                                        }},{safe: true , upsert:true},function(err,updatedSupervisor){
                                        if(err || !updatedSupervisor){
                                            console.log('Could not add scholar to supervisor');
                                        }
                                    });
                                }
        
                            });
        
        
                        });
                    }
                });
    
            });
    
            return res.json({status: 'success'});
            
        } else if(req.params.person == 'sdc'){
            console.log('in sdc');
            console.log(keyArr);
            req.body.forEach(data =>{

                // sdcArr = data[keyArr[2]].split('  ').filter( e => e!= '').join('').split('\n');
                var sdcArr = data[keyArr[2]].split('\n').join('  ').split(',').join(' ').split('  ').filter(e => e != '' && e!= ' ');
                // console.log('yoyo:',sdcArr);
                var schNameArr = data[keyArr[1]].trim().split(' ').filter(e=>e!='');
                sdcArr.forEach(supData =>{
                    var supervisor;
                    supData = supData.trim();
                    if(supData.indexOf('(') != -1){
                        supervisor = supData.slice(0,supData.indexOf('(')).trim();
                    } else{
                        supervisor = supData;
                    }

                    var nameArr = supervisor.split(' ').filter( e=> e!= "");
                    var mName = "";
                    var fName = nameArr[1];
                    var lName = nameArr[nameArr.length-1];
                    if(nameArr.length <3){
                        fName = nameArr[1];
                        lName = "";
                    } else if (nameArr.length > 3){
                        mName = nameArr[2];
                    }
                    // console.log(fName,mName,lName);
                    Supervisor.findOne({firstName: fName, middleName: mName,lastName: lName}, (err,sdcSup) =>{
                        var sdcMem = {};
                        if(err || !sdcSup){
                            sdcMem.ID = undefined;
                            sdcMem.name = `${supData}`;
                        } else {
                            sdcMem.ID = sdcSup._id;
                            sdcMem.name = `${supData}`;
                        }
                        // console.log(sdcMem);
                        var firName = schNameArr[1];
                        var lstName = schNameArr[schNameArr.length-1];
                        var midName = '';
                        if(schNameArr.length < 3){
                            lstName = '';
                        } else if(schNameArr.length > 3){
                            midName = schNameArr[2];
                        }
                        // console.log(schNameArr);
                        // Scholar.findOneAndUpdate(
                        //     {fistName: firName, middleName: midName, lastName:lstName}, 
                        //     {$push : {
                        //         'sdcMember' :{
                        //             ID: sdcMem.ID,
                        //             name: sdcMem.name
                        //         } 
                        //     }},(err,scholarData)=>{
                        //         if(err || !scholarData){
                        //             console.log('scholar not found :' ,scholarData);
                        //         } else {
                        //             console.log(scholarData);
                        //         }
                        // });
                        Scholar.findOne({firstName : firName, middleName: midName, lastName: lstName},(err,scholarData) =>{
                            if(err || !scholarData){
                                console.log('scholar not found :' + schNameArr);
                            } else {
                                Scholar.findByIdAndUpdate(scholarData._id,{$push : {sdcMember : sdcMem}},(err,schData) =>{
                                    if(err || !schData){
                                        console.log('could not add sdcMember');

                                    } else {
                                        console.log('sdc member added to '+ schNameArr);
                                    }
                                });
                            }
                        });
                    });

                });

            });
            return res.json({status : 'success'});

        } else if((req.params.person).startsWith("department")) {
            var x = ((req.params.person).slice((req.params.person).indexOf("(")+1,(req.params.person).length-1)).toLowerCase();
            var data = {
                [x] : []
            };
            req.body.forEach(dept => {
                var i = 0;
                temp = {
                    sno         : dept[keyArr[i++]],
                    name        : dept[keyArr[i++]].trim(),
                    designation : dept[keyArr[i++]].trim(),
                    capacity    : dept[keyArr[i++]].trim(),
                    duration    : dept[keyArr[i++]].trim(),
                };
                data[x].push(temp);
            });
            // ADD To DATABASE
            Drc.create(data,(err,drc) =>{
                if(err){
                    console.log(err);
                    return res.json({status:'error'});
                } else{
                    return res.json({status:'success'});
                }
            });
        }
        else {
            return res.json({status : 'error'});
        }

    } catch(e){
        console.log(e);
        return res.json({status: 'error'});
    } 
    

});

module.exports = router;
