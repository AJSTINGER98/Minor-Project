const mongoose = require("mongoose");


supervisorSchema = new mongoose.Schema({
    spID: Number,
    Name: String,
    Age: {type: Number, min: 20 , max: 60},
    Department: String,
    FoE: [String],
    YoC: {type: Number, min: new Date().getFullYear()-50 , max: new Date().getFullYear()},
});


module.exports = mongoose.model("supervisor",supervisorSchema);

