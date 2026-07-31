const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const { sendSuccess } = require('../utils/apiResponse');
const { getPagination, buildMeta } = require('../utils/paginate');
const { logActivity } = require('../services/activityService');

// @desc    Create a new client
// @route   POST /api/clients
// @access  Private
const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create({ ...req.body, createdBy: req.user.id });
  await logActivity(req.user.id, `Added new client: ${client.name}`);
  sendSuccess(res, 201, 'Client created successfully', client);
});

// @desc    Get all clients (search, pagination)
// @route   GET /api/clients
// @access  Private
const getClients = asyncHandler(async (req, res) => {
  const { search, sortBy = 'createdAt', order = 'desc' } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { createdBy: req.user.id };
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const [clients, total] = await Promise.all([
    Client.find(filter)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .populate('totalProjects'),
    Client.countDocuments(filter),
  ]);

  sendSuccess(res, 200, 'Clients fetched successfully', clients, buildMeta(total, page, limit));
});

// @desc    Get a single client by id
// @route   GET /api/clients/:id
// @access  Private
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, createdBy: req.user.id }).populate('totalProjects');
  if (!client) {
    throw new AppError('Client not found', 404);
  }
  sendSuccess(res, 200, 'Client fetched successfully', client);
});

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
  let client = await Client.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!client) {
    throw new AppError('Client not found', 404);
  }

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await logActivity(req.user.id, `Updated client: ${client.name}`);
  sendSuccess(res, 200, 'Client updated successfully', client);
});

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!client) {
    throw new AppError('Client not found', 404);
  }

  const linkedProjects = await Project.countDocuments({ client: client._id });
  if (linkedProjects > 0) {
    throw new AppError('Cannot delete a client with existing projects', 400);
  }

  await client.deleteOne();
  await logActivity(req.user.id, `Deleted client: ${client.name}`);
  sendSuccess(res, 200, 'Client deleted successfully', {});
});

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };
