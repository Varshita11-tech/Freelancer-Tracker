const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Payment = require('../models/Payment');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');
const { getPagination, buildMeta } = require('../utils/paginate');
const { logActivity } = require('../services/activityService');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({ ...req.body, createdBy: req.user.id });
  project.activity.push({ text: 'Project created' });
  await project.save();

  await logActivity(req.user.id, `Created project: ${project.name}`, project._id);

  const populated = await project.populate('client', 'name company email');
  sendSuccess(res, 201, 'Project created successfully', populated);
});

// @desc    Get all projects with search, filter, sort & pagination
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const {
    search,
    status,
    paymentStatus,
    priority,
    client,
    companyName,
    deadlineBefore,
    deadlineAfter,
    sortBy = 'createdAt',
    order = 'desc',
  } = req.query;

  const { page, limit, skip } = getPagination(req.query);

  const filter = { createdBy: req.user.id };

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;
  if (priority) filter.priority = priority;
  if (client) filter.client = client;
  if (companyName) filter.companyName = { $regex: companyName, $options: 'i' };

  if (deadlineBefore || deadlineAfter) {
    filter.deadline = {};
    if (deadlineBefore) filter.deadline.$lte = new Date(deadlineBefore);
    if (deadlineAfter) filter.deadline.$gte = new Date(deadlineAfter);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { companyName: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate('client', 'name company email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit),
    Project.countDocuments(filter),
  ]);

  sendSuccess(res, 200, 'Projects fetched successfully', projects, buildMeta(total, page, limit));
});

// @desc    Get a single project by id
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, createdBy: req.user.id }).populate(
    'client',
    'name company email phone country'
  );

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const payments = await Payment.find({ project: project._id }).sort({ paymentDate: -1 });

  sendSuccess(res, 200, 'Project fetched successfully', { ...project.toObject(), paymentTimeline: payments });
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  Object.assign(project, req.body);
  project.activity.push({ text: 'Project details updated' });
  await project.save();

  await logActivity(req.user.id, `Updated project: ${project.name}`, project._id);

  const populated = await project.populate('client', 'name company email');
  sendSuccess(res, 200, 'Project updated successfully', populated);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  await Payment.deleteMany({ project: project._id });
  await project.deleteOne();

  await logActivity(req.user.id, `Deleted project: ${project.name}`);
  sendSuccess(res, 200, 'Project deleted successfully', {});
});

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
