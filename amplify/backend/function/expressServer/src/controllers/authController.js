const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getJWTSecret = require('../utils/JWT');

const changeUserDetails = async (req, res, next) => {
  try {
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
      newPassword = req.body.newPassword;
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
      if (newUsername) {
        if (newUsername.length < 3) {
          res.status(400);
          res.errormessage = 'Username length must be at least 3 characters';
          return next(
            new Error('Username length must be at least 3 characters')
          );
        }
        // assign username to user after all checks
        user.username = newUsername;
      }

      const newAvatar = req.body.avatar;
      if (newAvatar) {
        user.avatar = newAvatar;
      }
      if (!newUsername && !newPassword && !newAvatar) {
        res.status(400);
        res.errormessage = 'No details to change';
        return next(new Error('No details to change'));
      }

      await user.save();
      res.status(200);
      res.json({ user });
    }
  } catch (error) {
    res.status(500);
    res.errormessage = 'Server error in changing user details';
    return next(new Error('Server error in changing user details'));
  }
};

module.exports = {
  changeUserDetails,
};
