const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = async (req, res, next) => {
 
  
  try {
    // Need some validation here, although it's already on the frontend and in the models
    /// Parse the body *NEED VALIDATION FOR NULLS HERE***
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      dob,
      location,
    } = req.body; 
    let user = await User.findOne({ email });

    // Check for existing user 
    if (user) {
      res.status(400);
      res.errormessage = 'User already exists';
      return next(new Error('User already exists'));
    }

    /// Create a ne user 
    user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      dob,
      location
    });

    /// Hash the password ///
    let salt      = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save user in DB 
    await user.save();
    const payload = {
      user: {
        user: {
          id: user.id,
        },
      },
    };

    jwt.sign( payload, config.get('jwtSecret'), {expiresIn:'360000'}, (err, token) => {
      if (err) throw err;
      res.json({
        firstname,
        lastname,
        email,
        username,
        token,
      })
    })

  } catch (err) {
    if (User) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }
};

//@desc Authenticate User
// route POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      res.errormessage = 'Invalid credentials';
      return next(new Error('Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      res.errormessage = 'Invalid credentials';
      return next(new Error('Invalid credentials'));
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          firstname: user.firstname,
          lastname: user.lastname,
          email,
          username: user.username,
          dob: user.dob,
          location: user.location,
          image: user.image,
          bio: user.bio,
          token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @desc get user data
// route get /api/users/info
// @access private

const getUserInfo = async (req, res,next) => {
  try {
    // get all their details except their password
    const userDetails = await User.findById(req.user.id).select('-password');

    if (!userDetails) {
      res.status(400);
      res.errormessage = 'There is no profile for this user';
      return next(new Error('No profile for this user'));
    }

    res.json(userDetails);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @route    DELETE api/users/delete
// @desc     Delete current user
// @access   Private
const deleteUser = async (req, res,next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id).select('-password');
    console.log(req.user.id);
    console.log('user = ' + user);

    if (!user) {
      res.status(404);
      res.errormessage = 'User not found';
      return next(new Error('User not found'));
    }

    res.json(user.name);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
};
