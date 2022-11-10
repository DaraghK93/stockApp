const express = require('express');
const router = express.Router();

const { resetPassword, recoverPassword } = require('../controllers/auth');

const { check } = require('express-validator');

//Password RESET
router.post(
  '/recover',
  [check('email').isEmail().withMessage('Enter a valid email address')],
  recoverPassword
);

router.post('/reset/:token', resetPassword);

module.exports = router;
