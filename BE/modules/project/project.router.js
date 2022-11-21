const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const projectController = require('./project.controller');

router.post('/create',needAuthenticated,  projectController.createProject);
router.get('/:taskId',needAuthenticated, projectController.getProject);
router.get('/',needAuthenticated, projectController.getProjects);
router.put('/:taskId',needAuthenticated, projectController.updateProject);
router.delete('/:taskId',needAuthenticated, projectController.deleteProject);


module.exports = router;