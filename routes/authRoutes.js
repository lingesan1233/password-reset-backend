const express = require('express');
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
  setNewPassword,
} = require('../controllers/authController');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/set-password', setNewPassword);

module.exports = router;
