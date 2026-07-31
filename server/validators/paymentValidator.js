const { body } = require('express-validator');

const createPaymentValidator = [
  body('project').trim().notEmpty().withMessage('Project reference is required')
    .isMongoId().withMessage('Project must be a valid id'),
  body('amount').notEmpty().withMessage('Amount is required')
    .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('paymentDate').optional().isISO8601().withMessage('Payment date must be a valid date'),
  body('paymentMethod').optional().isIn(['Bank Transfer', 'PayPal', 'Stripe', 'Credit Card', 'Cash', 'Crypto', 'Other']).withMessage('Invalid payment method'),
  body('status').optional().isIn(['Pending', 'Completed', 'Failed', 'Refunded']).withMessage('Invalid status'),
];

const updatePaymentValidator = [
  body('amount').optional().isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('paymentDate').optional().isISO8601().withMessage('Payment date must be a valid date'),
  body('paymentMethod').optional().isIn(['Bank Transfer', 'PayPal', 'Stripe', 'Credit Card', 'Cash', 'Crypto', 'Other']).withMessage('Invalid payment method'),
  body('status').optional().isIn(['Pending', 'Completed', 'Failed', 'Refunded']).withMessage('Invalid status'),
];

module.exports = { createPaymentValidator, updatePaymentValidator };
