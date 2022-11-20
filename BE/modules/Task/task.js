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
        default: "in progress"
    },
    // backlogID: {
    //     type: mongoose.Types.ObjectId,
    //     require: true
    // },
    // sprintID: {
    //     type: mongoose.Types.ObjectId
    // },
    projectID: {
        type: mongoose.Types.ObjectId
    },
    assignee: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    reporter: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,

    },

},
    {
        // tự động thêm createdAt, updatedAt
        timestamps: true
    });

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;
