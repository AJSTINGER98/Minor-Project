var mongoose = require("mongoose");

// SETUP SCHEMA
var drcSchema = new mongoose.Schema({
    cse : [{
        sno         : Number,
        name        : String,
        designation : String,
        capacity    : String,
        duration    : String
    }]
});

// RETURN MODEL
module.exports = mongoose.model("Drc",drcSchema);

