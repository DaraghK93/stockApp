const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo, deleteUser } = require('../controllers/userController')
const {protectedRoute} = require('../middleware/authMiddleware');

const { body } = require('express-validator');

router.post(
    '/',
    [
      body('email', 'Invalid email entered').trim().isEmail({domain_specific_validation: true}).normalizeEmail(),
    ],
    registerUser
  );

router.post('/login', loginUser)
router.get('/info',protectedRoute, getUserInfo)
router.delete('/delete',protectedRoute, deleteUser)

module.exports = router