const Activity = require('../models/Activity');

/**
 * Records an activity log entry. Designed to be fire-and-forget safe —
 * callers should not let a logging failure break the main request flow.
 */
const logActivity = async (userId, action, projectId = null) => {
  try {
    return await Activity.create({ user: userId, action, project: projectId });
  } catch (error) {
    console.error('Failed to log activity:', error.message);
    return null;
  }
};

module.exports = { logActivity };
