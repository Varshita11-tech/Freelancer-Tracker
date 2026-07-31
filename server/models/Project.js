const mongoose = require('mongoose');

const activityEntrySchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const attachmentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [150, 'Project name cannot exceed 150 characters'],
    },
    description: {
      type: String,
      default: '',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Client is required'],
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: [0, 'Budget cannot be negative'],
      default: 0,
    },
    receivedAmount: {
      type: Number,
      min: [0, 'Received amount cannot be negative'],
      default: 0,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Partially Paid', 'Unpaid'],
      default: 'Unpaid',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    activity: {
      type: [activityEntrySchema],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Keep remainingAmount and paymentStatus in sync whenever budget/receivedAmount change
ProjectSchema.pre('save', function (next) {
  this.remainingAmount = Math.max((this.budget || 0) - (this.receivedAmount || 0), 0);

  if (this.status !== 'Cancelled') {
    if (this.receivedAmount <= 0) {
      this.paymentStatus = 'Unpaid';
    } else if (this.receivedAmount >= this.budget) {
      this.paymentStatus = 'Paid';
    } else {
      this.paymentStatus = 'Partially Paid';
    }
  }
  next();
});

ProjectSchema.index({ name: 'text', companyName: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);
