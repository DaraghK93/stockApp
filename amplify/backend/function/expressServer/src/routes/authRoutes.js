const express = require('express');
const router = express.Router();

const {
  resetPassword,
  recoverPassword,
} = require('../controllers/authController');

const { body } = require('express-validator');

//Password RESET
router.post(
  '/recover',
  [
    body('email', 'No email entered').trim().not().isEmpty(),
    body('email', 'Invalid email entered').trim().isEmail(),
  ],
  recoverPassword
);

// The checks for this are within the resetPassword function so not using express-validator here
router.post('/reset/:token', resetPassword);

module.exports = router;
