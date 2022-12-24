const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskModel = new Schema ({
    idProject: {
        type: Number,
        required: true
    },
    taskName: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('Task', taskModel);