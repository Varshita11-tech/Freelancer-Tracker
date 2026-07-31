const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');
const { getPagination, buildMeta } = require('../utils/paginate');
const { logActivity } = require('../services/activityService');

/**
 * Recalculates a project's receivedAmount from all completed payments
 * and lets the Project pre-save hook sync remainingAmount/paymentStatus.
 */
const syncProjectPayments = async (projectId) => {
  const project = await Project.findById(projectId);
  if (!project) return;

  const payments = await Payment.find({ project: projectId, status: 'Completed' });
  const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);

  project.receivedAmount = totalReceived;
  await project.save();
};

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.body.project, createdBy: req.user.id });
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const payment = await Payment.create({ ...req.body, createdBy: req.user.id });

  await syncProjectPayments(project._id);
  project.activity.push({ text: `Payment of ${payment.amount} recorded` });
  await project.save();

  await logActivity(req.user.id, `Recorded payment of ${payment.amount} for project: ${project.name}`, project._id);

  sendSuccess(res, 201, 'Payment created successfully', payment);
});

// @desc    Get all payments (with optional project filter, pagination)
// @route   GET /api/payments
// @access  Private
const getPayments = asyncHandler(async (req, res) => {
  const { project, status, sortBy = 'paymentDate', order = 'desc' } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { createdBy: req.user.id };
  if (project) filter.project = project;
  if (status) filter.status = status;

  const [payments, total] = await Promise.all([
    Payment.find(filter)
      .populate('project', 'name status')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit),
    Payment.countDocuments(filter),
  ]);

  sendSuccess(res, 200, 'Payments fetched successfully', payments, buildMeta(total, page, limit));
});

// @desc    Get all payments for a specific project
// @route   GET /api/payments/project/:projectId
// @access  Private
const getProjectPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({
    project: req.params.projectId,
    createdBy: req.user.id,
  }).sort({ paymentDate: -1 });

  sendSuccess(res, 200, 'Project payments fetched successfully', payments);
});

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
  let payment = await Payment.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await syncProjectPayments(payment.project);
  await logActivity(req.user.id, `Updated payment record`, payment.project);

  sendSuccess(res, 200, 'Payment updated successfully', payment);
});

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Private
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  const projectId = payment.project;
  await payment.deleteOne();
  await syncProjectPayments(projectId);

  await logActivity(req.user.id, `Deleted a payment record`, projectId);
  sendSuccess(res, 200, 'Payment deleted successfully', {});
});

module.exports = { createPayment, getPayments, getProjectPayments, updatePayment, deletePayment };
