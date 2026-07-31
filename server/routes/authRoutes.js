const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  signupValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/authValidator');

router.post('/signup', authLimiter, signupValidator, validate, signup);
router.post('/login', authLimiter, loginValidator, validate, login);
router.post('/logout', protect, logout);

router
  .route('/profile')
  .get(protect, getProfile)
  .put(protect, uploadSingle('profileImage'), updateProfileValidator, validate, updateProfile);

router.put('/change-password', protect, changePasswordValidator, validate, changePassword);
router.post('/forgot-password', authLimiter, forgotPasswordValidator, validate, forgotPassword);
router.put('/reset-password/:token', resetPasswordValidator, validate, resetPassword);

module.exports = router;
