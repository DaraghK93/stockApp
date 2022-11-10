const User = require('../models/user.model');

const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(
  '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'
);

/**
 *
 * some controllers here
 *
 */

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
const recoverPassword = async (req, res, next) => {
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

    let link =
      'http://' + 'localhost:3000' + '/auth/reset/' + user.resetPasswordToken;

    const mailOptions = {
      to: user.email,
      from: 'caolandevelopment@gmail.com',
      subject: 'Password change request',
      text: `Hi ${user.username} \n 
              Please click on the following link ${link} to reset your password. \n\n 
              If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    try {
      sgMail.send(mailOptions, (error, result) => {
        if (error) {
          res.status(500);
          res.errormessage = error.message;
          return next(new Error(error.message));
        }

        res.status(200).json({
          message: 'A reset email has been sent to ' + user.email + '.',
        });
      });
    } catch (error) {
      res.status(500);
      res.errormessage = error.message;
      return next(new Error('Server error sending recovery email'));
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

  // send email
  const mailOptions = {
    to: user.email,
    from: 'caolandevelopment@gmail.com',
    subject: 'Your password has been changed',
    text: `Hi ${user.username} \n 
                  This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
  };

  try {
    sgMail.send(mailOptions, (error, result) => {
      if (error) {
        res.status(500);
        res.errormessage = error.message;
        return next(new Error(error.message));
      }

      res.status(200).json({ message: 'Your password has been updated.' });
    });
  } catch (error) {
    res.status(500);
    res.errormessage = error.message;
    return next(new Error('Server error resetting password'));
  }
};

module.exports = {
  resetPassword,
  recoverPassword,
};
