const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated');

const memberController = require('./member.controller');

router.post('/add', memberController.addMember);
router.delete('/kick', memberController.kickMember);

// router.get('/:taskId', needAuthenticated, taskController.getTask);
// router.get('/', needAuthenticated, taskController.getTasks);
// router.put('/:taskId', needAuthenticated, taskController.updateTask);
// router.put('/updatestatus', needAuthenticated, taskController.updateStatusTask);
// router.delete('/:taskId', needAuthenticated, taskController.deleteTask);
// router.delete('/', taskController.deleteAllTask);


module.exports = router;