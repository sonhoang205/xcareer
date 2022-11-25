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
  createdById: {
    type: mongoose.Types.ObjectId,
    require: true,
    // ref:"User"
  }
}, {
  timestamps: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;