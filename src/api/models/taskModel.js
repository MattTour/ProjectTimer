const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskModel = new Schema ({
    idProject: {
        type: String,
        required: true
    },
    taskName: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    debutDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Task', taskModel);