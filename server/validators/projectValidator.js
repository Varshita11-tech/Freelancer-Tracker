const { body } = require('express-validator');

const createProjectValidator = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('client').trim().notEmpty().withMessage('Client is required')
    .isMongoId().withMessage('Client must be a valid id'),
  body('budget').notEmpty().withMessage('Budget is required')
    .isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  body('receivedAmount').optional().isFloat({ min: 0 }).withMessage('Received amount must be a positive number'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed', 'Cancelled']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
];

const updateProjectValidator = [
  body('name').optional().trim().notEmpty().withMessage('Project name cannot be empty'),
  body('client').optional().isMongoId().withMessage('Client must be a valid id'),
  body('budget').optional().isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  body('receivedAmount').optional().isFloat({ min: 0 }).withMessage('Received amount must be a positive number'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed', 'Cancelled']).withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
];

module.exports = { createProjectValidator, updateProjectValidator };
