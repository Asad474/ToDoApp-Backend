const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 

    task: {
        type: String,
        required: true
    }, 

    completed: {
        type: Boolean,
        default: false
    }
}); 

module.exports = mongoose.model('Task', TaskSchema);