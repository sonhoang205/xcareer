const express = require('express');
const router = express.Router();

const projectController = require('./project.controller');

router.post('/create', projectController.createProject);
router.get('/:taskId', projectController.getProject);
router.get('/', projectController.getProjects);
router.put('/:taskId', projectController.updateProject);
router.delete('/:taskId', projectController.deleteProject);


module.exports = router;