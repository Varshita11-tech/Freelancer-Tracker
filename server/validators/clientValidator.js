const { body } = require('express-validator');

const createClientValidator = [
  body('name').trim().notEmpty().withMessage('Client name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('country').optional().trim(),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
];

const updateClientValidator = [
  body('name').optional().trim().notEmpty().withMessage('Client name cannot be empty'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('country').optional().trim(),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
];

module.exports = { createClientValidator, updateClientValidator };
