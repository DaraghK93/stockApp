const User = require('../models/user.model')
const Portfolio = require('../models/portfolio.model')
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
    } else if (typeof overeighteen == false) {
      res.status(400)
      res.errormessage = 'You must show that you are over 18'
    }

    let user = await User.findOne({ email })

    // Check for existing user
    if (user) {
      res.status(400)
      res.errormessage = 'User already exists'
      return next(new Error('User already exists'))
    }
    // Check if user ticked over eighteen checkbox
    else if (overeighteen === 'false') {
      res.status(400)
      res.errormessage = 'User is not over 18'
      return next(new Error('User is not over 18'))
    }

    // Create a new user
    user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
      overeighteen,
      portfolios
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
    console.log(token)
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

// @desc get user data
// route get /api/users/info
// @access private

const createPortfolio = async (req, res, next) => {
  try {
      const newPortfolio = new Portfolio({
      name: "Joey's Portfolio"
    });
      await User.updateOne({ email: email }, {$push: {portfolios: newPortfolio}})
      
      // const portfolio = await User.updateOne();
  
      res.json({ newPortfolio });
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }


module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  createPortfolio
}
