const express = require('express');
const router = express.Router();

const taskController = require('./task.controller');

router.post('/create', taskController.createTask);
router.get('/:taskId', taskController.getTask);
router.get('/', taskController.getTasks);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);


module.exports = router;