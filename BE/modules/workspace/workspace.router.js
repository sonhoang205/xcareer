const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const workspaceController = require('./workspace.controller');

router.post('/create', needAuthenticated, workspaceController.createWorkspace);
router.get('/:workspaceId', needAuthenticated, workspaceController.getWorkspace);
router.get('/', needAuthenticated, workspaceController.getWorkspaces);
router.put('/:workspaceId', needAuthenticated, workspaceController.updateWorkspace);
router.delete('/:workspaceId', needAuthenticated, workspaceController.deleteWorkspace);


module.exports = router;