// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login, resetPassword } = require('../controllers/authController');

// POST /signup
router.post('/signup', signup);

// POST /login
router.post('/login', login);

// POST /reset-password
router.post('/reset-password', resetPassword);

module.exports = router;
