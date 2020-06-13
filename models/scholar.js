var mongoose = require("mongoose");

// SETUP SCHEMA
var scholarSchema = new mongoose.Schema({
    scID         : Number,
    image        : {
        imgID       : mongoose.Schema.Types.ObjectId,
        imgName     : String,
    },
    title        : String,
    firstName    : String,
    lastName     : String,
    email        : String,
    phone        : String,
    age          : Number,
    department   : String,
    school       : String,
    supervisedBy : {
        ID      : mongoose.Schema.Types.ObjectId,
        supBy   : String,
    },
    academicQ    :[{
        degree         : String,
        specialisation : String,
        institute      : String,
        yoc            : String
    }],
    report       :[{
        reportId       : mongoose.Schema.Types.ObjectId,
        reportHexName  : String,
        reportName     : String
    }],
});

// RETURN MODEL
module.exports = mongoose.model("Scholar",scholarSchema);

