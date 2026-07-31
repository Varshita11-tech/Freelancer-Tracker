const express = require('express');
const router = express.Router();

const {
  createPayment,
  getPayments,
  getProjectPayments,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createPaymentValidator, updatePaymentValidator } = require('../validators/paymentValidator');

router.use(protect);

router.route('/').get(getPayments).post(createPaymentValidator, validate, createPayment);
router.get('/project/:projectId', getProjectPayments);
router.route('/:id').put(updatePaymentValidator, validate, updatePayment).delete(deletePayment);

module.exports = router;
