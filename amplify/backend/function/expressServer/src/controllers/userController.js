const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = async (req, res, next) => {
  try {
    // Parse the body
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      overeighteen
    } = req.body

    // check for nulls. all fields must be filled
    if (
      typeof firstname === 'undefined' ||
      typeof lastname === 'undefined' ||
      typeof email === 'undefined' ||
      typeof username === 'undefined' ||
      typeof password === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'All details are needed for a user to register'
      return next(
        new Error(
          'The client has not sent the required information to register the user',
        ),
      )
    } 
    let user = await User.findOne({ email })

    // Check for existing user
    if (user) {
      res.status(400)
      res.errormessage = 'User already exists'
      return next(new Error('User already exists'))
    }
    // Check if user ticked over eighteen checkbox
    if (overeighteen !== true) {
      res.status(400)
      res.errormessage = 'User is not over 18'
      return next(new Error('User is not over 18'))
    }
    // Checks for minimum password length, if contains a lower case character (a-z), an upper case character (A-Z), and a number (0-9)
    if ((password.length < 8) || (!/[a-z]/.test(password)) || (!/[A-Z]/.test(password)) ||  (!/[0-9]/.test(password)) ) {
      res.status(400)
      res.errormessage = 'Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!'
      return next(new Error('Password must be at least 8 characters long, contain at least one lower case English character (a-z), at least one upper case English character (A-Z) and at least one number (0-9)!'))
    }

    // Create a new user
    user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      overeighteen
    })

    /// Hash the password ///
    let salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Save user in DB
    await user.save()
    const payload = {
      user: {
        user: {
          id: user.id,
        },
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '360000' },
      (err, token) => {
        if (err) throw err
        res.json({
          firstname,
          lastname,
          email,
          username,
          token,
        })
      },
    )
  } catch (err) {
    if (User) {
      console.error(err.message)
      res.errormessage = 'Server error'
      return next(err)
    }
  }
}

//@desc Authenticate User
// route POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  // ensure they added email and password
  if (typeof email === 'undefined' || typeof password === 'undefined') {
    // data is missing
    res.status(400)
    res.errormessage = 'An email and password is required to login'
    return next(
      new Error(
        'The client has not sent the required email and password information',
      ),
    )
  }

  try {
    let user = await User.findOne({ email })

    if (!user) {
      res.status(404)
      res.errormessage = 'Invalid credentials'
      return next(new Error('Invalid credentials'))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400)
      res.errormessage = 'Invalid credentials'
      return next(new Error('Invalid credentials'))
    }
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({
          firstname: user.firstname,
          lastname: user.lastname,
          email,
          username: user.username,
          dob: user.dob,
          image: user.image,
          bio: user.bio,
          token,
        })
      },
    )
  } catch (err) {
    console.error(err.message)
    res.errormessage = 'Server error'
    return next(err)
  }
}

// @desc get user data
// route get /api/users/info
// @access private

const getUserInfo = async (req, res, next) => {
  try {
    // get all their details except their password
    const userDetails = await User.findById(req.user.id).select('-password')

    if (!userDetails) {
      res.status(400)
      res.errormessage = 'There is no profile for this user'
      return next(new Error('No profile for this user'))
    }

    res.json(userDetails)
  } catch (err) {
    console.error(err.message)
    res.errormessage = 'Server error'
    return next(err)
  }
}

// @route    DELETE api/users/delete
// @desc     Delete current user
// @access   Private
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id).select('-password')

    if (!user) {
      res.status(404)
      res.errormessage = 'User not found'
      return next(new Error('User not found'))
    }

    res.json(user.name)
  } catch (err) {
    console.error(err.message)
    res.errormessage = 'Server error'
    return next(err)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
}
