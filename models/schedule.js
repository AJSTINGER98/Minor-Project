var mongoose = require("mongoose");

// SETUP SCHEMA
var scheduleSchema = new mongoose.Schema({
    ID               : mongoose.Schema.Types.ObjectId,
    scholarDetails : {
        scID         : Number,
        title        : String,
        firstName    : String,
        middleName   : String,
        lastName     : String,
        department   : String,
        mode         : String,
        reschTitle   : String,
    },
    supervisedBy : {
        ID      : mongoose.Schema.Types.ObjectId,
        supBy   : String,
    },
    cosupervisor :{
        ID      : mongoose.Schema.Types.ObjectId,
        cosup   : String,
    },
    presentation: {
        first : Date,
        second : Date,
        final : Date,
    },
    sdcMember    :[{
        ID      : mongoose.Schema.Types.ObjectId,
        name    : String
    }],

});

// RETURN MODEL
module.exports = mongoose.model("Schedule",scheduleSchema);

