const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Payment = require('../models/Payment');
const Activity = require('../models/Activity');
const { sendSuccess } = require('../utils/apiResponse');

// @desc    Get aggregated dashboard statistics for the logged in user
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const [
    totalProjects,
    completedProjects,
    activeProjects,
    pendingProjects,
    paidProjects,
    unpaidProjects,
    monthlyIncomeAgg,
    yearlyIncomeAgg,
    totalIncomeAgg,
    pendingIncomeAgg,
    upcomingDeadlines,
    recentActivities,
  ] = await Promise.all([
    Project.countDocuments({ createdBy: userId }),
    Project.countDocuments({ createdBy: userId, status: 'Completed' }),
    Project.countDocuments({ createdBy: userId, status: 'In Progress' }),
    Project.countDocuments({ createdBy: userId, status: 'Pending' }),
    Project.countDocuments({ createdBy: userId, paymentStatus: 'Paid' }),
    Project.countDocuments({ createdBy: userId, paymentStatus: { $in: ['Unpaid', 'Partially Paid'] } }),
    Payment.aggregate([
      { $match: { createdBy: userId, status: 'Completed', paymentDate: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Payment.aggregate([
      { $match: { createdBy: userId, status: 'Completed', paymentDate: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Payment.aggregate([
      { $match: { createdBy: userId, status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Project.aggregate([
      { $match: { createdBy: userId, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$remainingAmount' } } },
    ]),
    Project.find({
      createdBy: userId,
      status: { $nin: ['Completed', 'Cancelled'] },
      deadline: { $gte: now, $lte: in30Days },
    })
      .select('name deadline status priority client')
      .populate('client', 'name company')
      .sort({ deadline: 1 })
      .limit(10),
    Activity.find({ user: userId })
      .populate('project', 'name')
      .sort({ date: -1 })
      .limit(10),
  ]);

  sendSuccess(res, 200, 'Dashboard stats fetched successfully', {
    totalProjects,
    completedProjects,
    activeProjects,
    pendingProjects,
    paidProjects,
    unpaidProjects,
    monthlyIncome: monthlyIncomeAgg[0]?.total || 0,
    yearlyIncome: yearlyIncomeAgg[0]?.total || 0,
    totalIncome: totalIncomeAgg[0]?.total || 0,
    pendingIncome: pendingIncomeAgg[0]?.total || 0,
    upcomingDeadlines,
    recentActivities,
  });
});

module.exports = { getDashboardStats };
