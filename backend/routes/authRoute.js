const express = require('express');
const router = express.Router();
const { signup, signin, logout,userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

//auth routes

// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.post('/logout', logout);
// /api/me
router.post('/me',isAuthenticated, userProfile);


module.exports = router;
