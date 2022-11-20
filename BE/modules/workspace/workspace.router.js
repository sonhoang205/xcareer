const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const workspaceController = require('./workspace.controller');

router.post('/create', workspaceController.createWorkspace);
router.get('/:workspaceId', workspaceController.getWorkspace);
router.get('/', workspaceController.getWorkspaces);
router.put('/:workspaceId', workspaceController.updateWorkspace);
router.delete('/:workspaceId', workspaceController.deleteWorkspace);


module.exports = router;