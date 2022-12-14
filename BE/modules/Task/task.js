const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,

    },
    status: {
        type: String,

    },
    projectID: {
        type: mongoose.Types.ObjectId
    },
    assignee: {
        type: String,
        require: true
    },
    reporter: {
        type: String,
        require: true
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    fileName:{
        type: String,
    }

},
    {
        // tự động thêm createdAt, updatedAt
        timestamps: true
    });

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
