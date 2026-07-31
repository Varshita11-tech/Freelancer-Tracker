const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Client = require('../models/Client');
const { sendSuccess } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

// @desc    Global search across project name, client name, and company name
// @route   GET /api/search?q=term
// @access  Private
const globalSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) {
    throw new AppError('Search query is required', 400);
  }

  const regex = { $regex: q, $options: 'i' };

  const matchingClients = await Client.find({
    createdBy: req.user.id,
    $or: [{ name: regex }, { company: regex }],
  }).select('_id');

  const clientIds = matchingClients.map((c) => c._id);

  const projects = await Project.find({
    createdBy: req.user.id,
    $or: [{ name: regex }, { companyName: regex }, { client: { $in: clientIds } }],
  })
    .populate('client', 'name company email')
    .limit(50);

  sendSuccess(res, 200, 'Search results fetched successfully', { projects, count: projects.length });
});

module.exports = { globalSearch };
