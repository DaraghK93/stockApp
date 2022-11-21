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
  } catch (error) {
    res.status(500);
    res.errormessage = 'Server error in changing user details';
    return next(new Error('Server error in changing user details'));
  }
};

module.exports = {
  changeUserDetails,
};
