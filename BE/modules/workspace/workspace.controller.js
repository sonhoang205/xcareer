
const UserModel = require('../auth/user');
const WorkspaceModel = require('./workspace')

const createWorkspace = async (req, res) => {
    try {
        // const {existedUser} = req.user;
        // console.log(existedUser);
        const { name, type, adminId } = req.body;

        const newWorkspace = await WorkspaceModel.create({
            name, type, adminId
        });

        res.send({ success: 1, data: newWorkspace });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        const deleteWorkspace = await WorkspaceModel
            .findByIdAndDelete(workspaceId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const dataUpdateWorkspace = req.body;

        const updatedWorkspace = await WorkspaceModel
            .findByIdAndUpdate(workspaceId, dataUpdateWorkspace, { new: true });

        res.send({ success: 1, data: updatedWorkspace });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getWorkspaces = async (req, res) => {
    try {
        const { adminId } = req.query
        const workspaces = await WorkspaceModel.find({ 'adminId': adminId }
            // .skip(offset)
            // .limit(limit)
        );
        const totalWorkspace = await WorkspaceModel.find({ 'adminId': adminId }).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    workspaces: workspaces,
                    total: totalWorkspace
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const workspace = await WorkspaceModel
            .findById(workspaceId);

        // await console.log(backlog.prjectId.toString());
        // console.log(TaskModel.findById(comment.taskId));

        const admin = await UserModel.findById(workspace.adminId)
        console.log(project);
        res.send(
            {
                success: 1,
                data: workspace

            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

module.exports = { createWorkspace, deleteWorkspace, updateWorkspace, getWorkspace, getWorkspaces }