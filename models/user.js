const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    isAdmin: Boolean,
});

userSchema.plugin(passportLocalMongoose,{usernameQueryFields: ["email"]});

module.exports = mongoose.model('User', userSchema);