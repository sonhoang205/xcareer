const ProjectModel = require('./project');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createProject = async (req, res) => {
    try {

        const { name, type, workspaceId, lead } = req.body;

        const newProject = await ProjectModel.create({
            name,
            type,
            workspaceId,
            lead
        });

        res.send({ success: 1, data: newProject });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const deleteProject = await ProjectModel
            .findByIdAndDelete(projectId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const dataUpdateProject = req.body;

        const updatedProject = await ProjectModel
            .findByIdAndUpdate(projectId, dataUpdateProject, { new: true });

        res.send({ success: 1, data: updatedProject });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const { workspaceId } = req.query


        const projects = await ProjectModel
            .find({ 'workspaceId': workspaceId })
            // .skip(offset)
            // .limit(limit)
        ;
        const totalProject = await ProjectModel.find({ 'workspaceId': workspaceId }).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    projects: projects,
                    total: totalProject
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await (await ProjectModel
            .findById(projectId)
        );
        res.send(
            {
                success: 1,
                data: project
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

module.exports = { createProject, deleteProject, updateProject, getProject, getProjects }