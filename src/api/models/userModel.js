const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    }, 
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

module.exports = mongoose.model('User', userSchema);