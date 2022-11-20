const TaskModel = require('./task');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createTask = async (req, res) => {
    try {
        //     const token = req.headers.authorization;

        // if (!token) {
        //   throw new Error('Not found token');
        // }

        // // const jwtToken = token.split(' ')[1];
        // // check token có thuộc token của dự án mình ko
        // // check token có hết hạn hay ko
        // // trả về payload

        // const data = jwt.verify(token, process.env.SECRET_KEY);

        // const { userId } = data;
        // if (!userId) {
        //   throw new Error('Authorization fail');
        // }
        // console.log(data);

        // const existedUser = await UserModel.findById(userId);

        // if (!existedUser) {
        //   throw new Error('Authorization fail');
        // }

        // console.log(token);
        // const senderUser = req.user

        const { title, description, status, assignee, reporter, startTime, endTime, projectID } = req.body;

        const newTask = await TaskModel.create({
            title,
            description,
            status,
            assignee,
            reporter,
            startTime,
            endTime,
            projectID


            //   createdBy: existedUser._id,
        });

        res.send({ success: 1, data: newTask });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
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
        const tasks = await (await TaskModel
            .find({})
            // .skip(offset)
            // .limit(limit)
        );
        const totalTasks = await TaskModel.countDocuments({});
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

module.exports = { createTask, deleteTask, updateTask, getTasks, getTask }