var mongoose = require("mongoose");

// SETUP SCHEMA
var notificationSchema = new mongoose.Schema({
    text : String,
    link : String,
    createdAt : {type: Date, default : Date.now}
});

// RETURN MODEL
module.exports = mongoose.model("Notification",notificationSchema);

