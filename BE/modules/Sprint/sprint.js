const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    backlogID: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        require: true
    },
    sprintGoal: {
        type: String
    }
},
    {
        // tự động thêm createdAt, updatedAt
        timestamps: true
    });

const SprintModel = mongoose.model('Sprint', SprintSchema);

module.exports = SprintModel;
