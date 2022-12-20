const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    group_id: {
        type: Number,
        required: true
    }, 
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Project', projectSchema);
