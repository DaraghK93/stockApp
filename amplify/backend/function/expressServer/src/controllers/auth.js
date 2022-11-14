const User = require('../models/user.model');

const getHost = require('../utils/Host');
const getEmailAPIKEY = require('../utils/EMAIL_API_KEY');
const { validationResult } = require('express-validator');

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];

/**
 *
 * some controllers here
 *
 */

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
const recoverPassword = async (req, res, next) => {
  const errors = validationResult(req);
  //validate input
  try {
    if (!errors.isEmpty() && errors.errors[0].msg === 'No email entered') {
      res.status(400);
      res.errormessage = 'Email cannot be empty. Please try again';
      return next(new Error('No email entered'));
    } else if (
      !errors.isEmpty() &&
      errors.errors[0].msg === 'Invalid email entered'
    ) {
      res.status(400);
      res.errormessage = 'Invalid email address. Please try again';
      return next(new Error('Invalid email address entered.'));
    }
  } catch (error) {
    res.status(500);
    res.errormessage = error.message;
    return next(new Error('Server error in password recovery'));
  }

  const API_KEY = await getEmailAPIKEY();
  apiKey.apiKey = API_KEY;

  const host = await getHost();
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401);
      res.errormessage =
        'The email address ' +
        req.body.email +
        ' is not associated with any account. Double-check your email address and try again.';
      return next(new Error('Email address not associated with any account'));
    }

    //Generate and set password reset token
    const token = await user.generatePasswordReset();

    user = await user.save();

    let link = host + '/auth/reset/' + user.resetPasswordToken;

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    const sender = {
      email: process.env.FROM_EMAIL,
      name: 'Caolan Power',
    };
    const receivers = [
      {
        email: user.email,
      },
    ];
    try {
      let response = await apiInstance.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Password change request',
        textContent: `Hi ${user.username} \n 
        Please click on the following link ${link} to reset your password. \n\n 
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      });
      res.status(200).json({
        message: 'A reset email has been sent to ' + user.email + '.',
      });
      return;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500);
    res.errormessage = error.message;
    return next(new Error('Server error in password recovery'));
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
const resetPassword = async (req, res, next) => {
  let user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(401);
    res.errormessage = 'Password reset token is invalid or has expired';
    return next(new Error('Password reset token invalid or has expired'));
  }

  //Set the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  try {
    user = await user.save();
  } catch (error) {
    res.status(500);
    res.errormessage = err.message;
    return next(new Error(err.message));
  }

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  const sender = {
    email: process.env.FROM_EMAIL,
    name: 'Caolan Power',
  };
  const receivers = [
    {
      email: user.email,
    },
  ];
  try {
    let response = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your password has been changed',
      textContent: `Hi ${user.username} \n 
      This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    });
    res.status(200).json({
      message: 'A reset email has been sent to ' + user.email + '.',
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  resetPassword,
  recoverPassword,
};
