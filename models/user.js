const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true, required: true},
    isAdmin: Boolean,
    isSupervisor: Boolean,
    refID: mongoose.Schema.Types.ObjectId,
    resetPasswordToken : String,
    resetPasswordExpires : Date
});

userSchema.plugin(passportLocalMongoose,{usernameQueryFields: ["email"]});

module.exports = mongoose.model('User', userSchema);