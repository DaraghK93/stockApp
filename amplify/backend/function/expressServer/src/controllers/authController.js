const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getHost = require('../utils/Host');
const getEmailAPIKEY = require('../utils/EMAIL_API_KEY');
const { validationResult } = require('express-validator');

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];

// @route POST api/auth/changeuserdetails
// @desc Change user details - Takes new details from req.body
// current password must match before anything can change
// @access Private
const changeUserDetails = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    //validate input
    if (!errors.isEmpty() && errors.errors[0].msg === 'Invalid email entered') {
      res.status(400);
      res.errormessage = 'Invalid email address. Please try again';
      return next(new Error('Invalid email address entered.'));
    }
    if (req.body.email) {
      // test valid email has been entered based on mongo query
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!re.test(req.body.email)) {
        res.status(400);
        res.errormessage = 'Invalid email address. Please try again';
        return next(new Error('Invalid email address entered.'));
      }
    }

    const token = req.headers['x-auth-token'];
    // required fields = users current password
    // check if password exists and if it does check it is valid
    currPassword = req.body.password;
    if (!currPassword) {
      res.status(400);
      res.errormessage = 'Old password required to change any user details';
      return next(
        new Error('Current password required to change any user details')
      );
    }
    // check if old password is correct
    const user = await User.findById(req.user.id);
    // compare old password with currpassword
    const isMatch = await bcrypt.compare(currPassword, user.password);

    if (!isMatch) {
      res.status(401);
      res.errormessage = 'Current password incorrect';
      return next(new Error('Current Password incorrect'));
    } else {
      let newPassword = req.body.newPassword;
      if (newPassword) {
        // Checks for minimum password length, if contains a lower case character (a-z), an upper case character (A-Z), and a number (0-9)
        if (
          newPassword.length < 8 ||
          !/[a-z]/.test(newPassword) ||
          !/[A-Z]/.test(newPassword) ||
          !/[0-9]/.test(newPassword)
        ) {
          res.status(400);
          res.errormessage =
            'Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!';
          return next(
            new Error(
              'Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!'
            )
          );
        }

        /// Hash the new password ///
        let salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);

        user.password = newPassword;
      }
      // checks for username update
      const newUsername = req.body.username;
      // check if username exists already
      const userWithUsername = await User.findOne({ username: newUsername });

      // Check for existing user
      if (userWithUsername) {
        res.status(400);
        res.errormessage = 'Username already taken';
        return next(new Error('Username already taken'));
      }
      if (newUsername) {
        if (newUsername.length < 3) {
          res.status(400);
          res.errormessage = 'Username length must be at least 3 characters';
          return next(
            new Error('Username length must be at least 3 characters')
          );
        }
        if (newUsername.length > 12) {
          res.status(400);
          res.errormessage = 'Username length must be less than 12 characters';
          return next(
            new Error('Username length must be less than 12 characters')
          );
        }
        // assign username to user after all checks
        user.username = newUsername;
      }

      // Check for new avatar
      const newAvatar = req.body.avatar;
      if (newAvatar) {
        user.avatar = newAvatar;
      }
      // check for new first name
      const newFirstname = req.body.firstname;
      if (newFirstname) {
        user.firstname = newFirstname;
      }
      // check for new last name
      const newLastname = req.body.lastname;
      if (newLastname) {
        user.lastname = newLastname;
      }
      // check for new email already validated from express validator
      const newEmail = req.body.email;
      // check if email exists already
      const userWithEmail = await User.findOne({ email: newEmail });
      if (userWithEmail) {
        res.status(400);
        res.errormessage = 'Email already taken';
        return next(new Error('Email already taken'));
      }
      if (newEmail) {
        user.email = newEmail;
      }

      if (
        !newUsername &&
        !newPassword &&
        !newAvatar &&
        !newFirstname &&
        !newLastname &&
        !newEmail
      ) {
        res.status(400);
        res.errormessage = 'No details to change';
        return next(new Error('No details to change'));
      }
      await user.save();

      res.status(200);
      res.json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
        token,
      });
    }
  } catch (error) {
    res.status(500);
    res.errormessage = error.message;
    return next(new Error('Server error in changing user details'));
  }
};

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
const recoverPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    //validate input
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
    // get and set the api key
    const API_KEY = await getEmailAPIKEY();
    apiKey.apiKey = API_KEY;

    // get the host from params this is for the password reset link
    const host = await getHost();
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

    const sender = {
      email: process.env.FROM_EMAIL,
      name: 'FinOptimise',
    };
    const receivers = [
      {
        email: user.email,
      },
    ];
    let response = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'FinOptimise password change request',
      textContent: `Hi ${user.username} \n 
      Please click on the following link ${link} to reset your password. \n\n 
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });
    res.status(200).json({
      message: 'A reset email has been sent to ' + user.email + '.',
    });
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
  try {
    let password = req.body.password;
    // Checks for minimum password length, if contains a lower case character (a-z), an upper case character (A-Z), and a number (0-9)
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      res.status(400);
      res.errormessage =
        'Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!';
      return next(
        new Error(
          'Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!'
        )
      );
    }
    let user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(401);
      res.errormessage = 'Password reset token is invalid or has expired';
      return next(new Error('Password reset token invalid or has expired'));
    }

    /// Hash the password ///
    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //Set the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user = await user.save();

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: process.env.FROM_EMAIL,
      name: 'FinOptimise',
    };
    const receivers = [
      {
        email: user.email,
      },
    ];

    let response = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your FinOptimise password has been changed',
      textContent: `Hi ${user.username} \n 
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
    });
    res.status(200).json({
      message: 'Confirmation email sent to ' + user.email + '!',
    });
    return;
  } catch (error) {
    res.status(500);
    res.errormessage = error.message;
    return next(new Error('Server error in password reset'));
  }
};

module.exports = {
  changeUserDetails,
  resetPassword,
  recoverPassword,
};
