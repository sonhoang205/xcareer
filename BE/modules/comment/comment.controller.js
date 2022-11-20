const CommentModel = require('./comment');
const TaskModel = require('../Task/task');


const createComment = async (req, res) => {
    try {
        // const {existedUser} = req.user;
        // console.log(existedUser);
        const {
            content,
            taskId,
            createdBy } = req.body;

        const searchTask = await TaskModel.findById(taskId);

        console.log(searchTask);

        const newComment = await CommentModel.create({
            content,
            taskId,
            createdBy
        });

        res.send({ success: 1, data: newComment });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const deleteComment = await CommentModel
            .findByIdAndDelete(commentId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const dataUpdateComment = req.body;

        const updatedComment = await CommentModel
            .findByIdAndUpdate(commentId, dataUpdateComment, { new: true });

        res.send({ success: 1, data: updatedComment });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getComments = async (req, res) => {
    try {
        const { taskId } = req.query
        console.log(taskId);
        const comments = await CommentModel.find({ 'taskId': taskId }
            // .skip(offset)
            // .limit(limit)
        );
        const totalComment = await CommentModel.find({ 'taskId': taskId }).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    comments: comments,
                    total: totalComment
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await CommentModel
            .findById(commentId);

        console.log(comment.task);
        console.log(comment.taskId.toString());
        // console.log(TaskModel.findById(comment.taskId));

        const task = await TaskModel.findById(comment.taskId)
        console.log(task);
        res.send(
            {
                success: 1,
                data: comment

            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

module.exports = { createComment, deleteComment, updateComment, getComment, getComments }