const SprintModel = require('./sprint');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createSprint = async (req, res) => {
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

        const { name, status, startTime, endTime , sprintGoal} = req.body;

        const newSprint = await SprintModel.create({
            name,
            status,
            startTime,
            endTime,
            sprintGoal
        });

        res.send({ success: 1, data: newSprint });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;

        const deletesprint = await SprintModel
            .findByIdAndDelete(sprintId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;
        const dataUpdateSprint = req.body;

        const updatedSprint = await SprintModel
            .findByIdAndUpdate(sprintId, dataUpdateSprint, { new: true });

        res.send({ success: 1, data: updatedSprint });
    } catch (err) {
        res.status(400).send({ success: 0, data: null });
    }
}

const getSprints = async (req, res) => {
    try {
        const sprints = await (await SprintModel
            .find({})
            // .skip(offset)
            // .limit(limit)
        );
        const totalSprint = await SprintModel.countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    sprints: sprints,
                    total: totalSprint
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

const getSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;
        const sprint = await (await SprintModel
            .findById(sprintId)
        );
        res.send(
            {
                success: 1,
                data: sprint
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

module.exports = { createSprint, deleteSprint, updateSprint, getSprint, getSprints }