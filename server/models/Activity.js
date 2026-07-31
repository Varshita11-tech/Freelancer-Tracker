const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: [true, 'Action description is required'],
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ActivitySchema.index({ date: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);
