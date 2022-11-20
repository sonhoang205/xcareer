const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  taskId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"Task"
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref:"User"
  }
}, {
  timestamps: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;