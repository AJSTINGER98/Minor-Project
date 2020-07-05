const mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    formId      : mongoose.Schema.Types.ObjectId,
    formName    : String,
});

module.exports = mongoose.model('Form',formSchema);