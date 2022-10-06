const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String
    },
    task_status: {
        type: String,
        default: "pending"
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    creation_date: {
      type: String
    },
    updation_date: {
      type: String
    }
})

module.exports = mongoose.model('Task', taskSchema);