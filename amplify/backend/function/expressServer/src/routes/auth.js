/// Description:
//      Contains routes under the main route api/league
const express = require('express');
const router = express.Router();

const {
  resetPassword,
  recoverPassword,
  resetPasswordTest,
  reset,
} = require('../controllers/auth');

const { check } = require('express-validator');

router.get('/reset', resetPasswordTest);

//Password RESET
router.post(
  '/recover',
  [check('email').isEmail().withMessage('Enter a valid email address')],
  recoverPassword
);

router.get('/reset/:token', reset);

router.post(
  '/reset/:token',
  //   [
  //     check('password')
  //       .not()
  //       .isEmpty()
  //       .isLength({ min: 6 })
  //       .withMessage('Must be at least 6 chars long'),
  //     // check('confirmPassword', 'Passwords do not match').custom(
  //     //   (value, { req }) => value === req.body.password
  //     // ),
  //   ],
  resetPassword
);

module.exports = router;
