const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    idUserAdmin: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Group', groupSchema);