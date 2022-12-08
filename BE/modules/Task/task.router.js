const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated');

const taskController = require('./task.controller');

router.post('/create', taskController.createTask);
router.get('/:taskId', needAuthenticated, taskController.getTask);
router.get('/', taskController.getTasks);
router.put('/:taskId', needAuthenticated, taskController.updateTask);
router.put('/updatestatus', needAuthenticated, taskController.updateStatusTask);
router.delete('/:taskId', needAuthenticated, taskController.deleteTask);
router.delete('/', taskController.deleteAllTask);


module.exports = router;