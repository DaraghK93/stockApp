const User = require('../models/user.model');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc Get all tweets (for testing) limit to 20 returning now for demo
// @route POST /api/tweet/all
// @access Public

const resetPasswordTest = async (req, res, next) => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const msg = {
    to: 'caolanpowerpac@gmail.com', // Change to your recipient
    from: 'caolandevelopment@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
  res.json({ response: 'here we are' });
};

/**
 *
 * some controllers here
 *
 */

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
const recoverPassword = async (req, res, next) => {
  console.log('hello');
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            'The email address ' +
            req.body.email +
            ' is not associated with any account. Double-check your email address and try again.',
        });

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email
          let link =
            'http://' +
            req.headers.host +
            '/api/auth/reset/' +
            user.resetPasswordToken;
          const mailOptions = {
            to: user.email,
            from: 'caolandevelopment@gmail.com',
            subject: 'Password change request',
            text: `Hi ${user.username} \n 
                    Please click on the following link ${link} to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          sgMail.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });

            res.status(200).json({
              message: 'A reset email has been sent to ' + user.email + '.',
            });
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
const reset = async (req, res, next) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: 'Password reset token is invalid or has expired.' });

      //Redirect user to form with the email address
      res.render('reset', { user });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
const resetPassword = async (req, res, next) => {
  console.log('hello');
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    if (!user)
      return res
        .status(401)
        .json({ message: 'Password reset token is invalid or has expired.' });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save((err) => {
      if (err) return res.status(500).json({ message: err.message });

      // send email
      const mailOptions = {
        to: user.email,
        from: 'caolandevelopment@gmail.com',
        subject: 'Your password has been changed',
        text: `Hi ${user.username} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };

      sgMail.send(mailOptions, (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        res.status(200).json({ message: 'Your password has been updated.' });
      });
    });
  });
};

module.exports = {
  resetPasswordTest,
  resetPassword,
  recoverPassword,
  reset,
};
