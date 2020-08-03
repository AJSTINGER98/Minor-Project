var mongoose = require("mongoose");

// SETUP SCHEMA
var supervisorSchema = new mongoose.Schema({
    spID         : Number,
    image        : {
        imgID       : mongoose.Schema.Types.ObjectId,
        imgName     : String,
    },
    title        : String,
    firstName    : String,
    middleName   : String,
    lastName     : String,
    email        : String,
    phone        : String,
    age          : Number,
    academicRole : String,
    department   : String,
    school       : String,
    schUnder     : [{
        ID  : mongoose.Schema.Types.ObjectId,
        sch : String
    }],
    academicQ    :[{
        degree         : String,
        specialisation : String,
        institute      : String,
        yoc            : String
    }],
    experience   :[{
        organisation : String,
        designation  : String,
        role         : String,
        tenure       : String
    }],
    research     :[{
        title    : String,
        duration : String,
        agency   : String,
        role     : String,
        amount   : String
    }],
    report       :[{
        reportId       : mongoose.Schema.Types.ObjectId,
        reportName     : String,
        scholarName    : String,
    }],
    FoE: [String]
});

// RETURN MODEL
module.exports = mongoose.model("Supervisor",supervisorSchema);

