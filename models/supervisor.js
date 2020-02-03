const mongoose = require("mongoose");

supervisorSchema = new mongoose.Schema({
    spID: String,
    Name: String,
    Age: {type: Number, min: 20 , max: 60},
    Department: String,
    FoE: [String],
    YoC: Date,
});

module.exports = mongoose.model("supervisor",supervisorSchema);
