/**
 * Standardized API response helpers to keep response shape consistent
 * across the entire application.
 */

const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}, meta = null) => {
  const payload = { success: true, message, data };
  if (meta) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

const sendError = (res, statusCode = 500, message = 'Something went wrong', errors = null) => {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

module.exports = { sendSuccess, sendError };
