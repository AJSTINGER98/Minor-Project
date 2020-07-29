var mongoose = require("mongoose");

// SETUP SCHEMA
var scholarSchema = new mongoose.Schema({
    scID         : { type : Number, unique : true, required : true},
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
    department   : String,
    school       : String,
    supervisedBy : {
        ID      : mongoose.Schema.Types.ObjectId,
        supBy   : String,
    },
    cosupervisor :{
        ID      : mongoose.Schema.Types.ObjectId,
        cosup   : String,
    },
    mode         : String,
    regDate      : Date,
    reschTitle   : String,
    sdcMember    :[{
        ID      : mongoose.Schema.Types.ObjectId,
        name    : String
    }],
    report       :[{
        reportId       : mongoose.Schema.Types.ObjectId,
        reportHexName  : String,
        reportName     : String
    }],
    phdCompleted  : Boolean,
});

// RETURN MODEL
module.exports = mongoose.model("Scholar",scholarSchema);

