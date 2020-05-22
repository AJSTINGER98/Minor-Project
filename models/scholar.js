var mongoose = require("mongoose");

// SETUP SCHEMA
var scholarSchema = new mongoose.Schema({
    scID         : Number,
    image        : String,
    title        : String,
    firstName    : String,
    lastName     : String,
    email        : String,
    phone        : String,
    age          : Number,
    department   : String,
    school       : String,
    academicQ    :[{
        degree         : String,
        specialisation : String,
        institute      : String,
        yoc            : String
    }]
});

// RETURN MODEL
module.exports = mongoose.model("Scholar",scholarSchema);

