const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const commentController = require('./comment.controller');

router.post('/create', needAuthenticated, commentController.createComment);
router.get('/:commentId', commentController.getComment);
router.get('/',needAuthenticated, commentController.getComments);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);


module.exports = router;