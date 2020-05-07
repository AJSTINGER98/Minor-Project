var mongoose = require("mongoose");

// SETUP SCHEMA
var supervisorSchema = new mongoose.Schema({
    spID         : Number,
    firstName    : String,
    lastName     : String,
    email        : String,
    phone        : String,
    age          : Number,
    academicRole : String,
    department   : String,
    school       : String,
    academicQ    :[{
        degree         : String,
        specialisation : String,
        institute      : String,
        yoc            : Number
    }],
    experience   :[{
        organisation : String,
        designation  : String,
        role         : String,
        tenure       : Number
    }],
    research     :[{
        title    : String,
        duration : Number,
        agency   : String,
        role     : String,
        amount   : Number
    }],
    FoE: [String]
});

// RETURN MODEL
module.exports = mongoose.model("Supervisor",supervisorSchema);

