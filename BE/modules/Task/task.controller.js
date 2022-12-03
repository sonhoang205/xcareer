const TaskModel = require('./task');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createTask = async (req, res) => {
    try {

        // const senderUser = req.user

        const { title, description, status, assignee, reporter, startTime, endTime, projectID } = req.body;

        const newTask = await TaskModel.create({
            title,
            description,
            status,
            projectID,
            assignee,
            reporter,
            startTime,
            endTime,
            //   createdBy: existedUser._id,
        });

        res.send({ success: 1, data: newTask });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteAllTask = async (req, res) => {
    try {
        const deleteAllTask = await TaskModel.deleteMany({})

        res.send({ success: 1 })
    } catch (error) {
        res.send({ success: 0, message: error.message })

    }
}
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deleteTask = await TaskModel
            .findByIdAndDelete(taskId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateStatusTask = async (req, res) => {
    try {
        const { status, taskId } = req.body
        const updateStatusTask = await TaskModel.findByIdAndUpdate(taskId, status, { new: true })

        res.send({ success: 1 })

    } catch (error) {
        res.status(400).send({ success: 1 })
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const dataUpdateTask = req.body;

        const updatedTask = await TaskModel
            .findByIdAndUpdate(taskId, dataUpdateTask, { new: true });

        res.send({ success: 1, data: updatedTask });
    } catch (err) {
        res.status(400).send({ success: 0, data: null });
    }
}


const getTasks = async (req, res) => {
    try {

        const { projectId, status } = req.query;
        const tasks = await TaskModel
            .find({})
            .where('projectID', projectId)
            .where('status', status)
            // .skip(offset)
            // .limit(limit)
            ;
        const totalTasks = await TaskModel
            .find({})
            .where('projectID', projectId)
            .where('status', status)
            .countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    tasks: tasks,
                    total: totalTasks
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await (await TaskModel
            .findById(taskId)
        );
        res.send(
            {
                success: 1,
                data: task
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

module.exports = { createTask, deleteTask, updateTask, getTasks, getTask, updateStatusTask , deleteAllTask}