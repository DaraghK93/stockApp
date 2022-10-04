const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
// const valid = require('validMiddle')

// @desc Register new uesr
// @route POST /api/users
// @access Public

const registerUser = async (req,res) => {

   // may need to put some validation here, although it's already on the frontend and in the models
        const {name,email,username,password} = req.body;
        // console.log(name)
        try {
            let user = await User.findOne({ email });
    
            if(user) {
                return res.status(400).json({ error: 'User already exists'});
            }
    
            user = new User({
                name,
                username,
                email,
                password
            });
            let salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
    
            await user.save();
            console.log(user)
            const payload = {
                user: {
                    user: {
                        id: user.id
                    }
                }
            }
    
            jwt.sign(payload,
             config.get('jwtSecret'), // need to set config in .env this is throwing an error for now
            { expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            });
    
        } catch (err) {
            if(User) {
                console.error(err.message);
                return res.status(500).send('Server error');
    
            }
        }
    };


//@desc Authenticate USer
// route POST /api/users/login
// @access Public

const loginUser = async (req,res) => {
    const {email, password} = req.body
    try{
        let user = await User.findOne({ email });

        if(!user) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }]  });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials' }]  });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

}

// @desc get user data
// route get /api/users/info
// @access private

const getUserInfo = async (req,res) => {

    try {
    // get all their details except their password
      const userDetails = await User.findById(req.user.id).select('-password');
  
      if (!userDetails) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(userDetails);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


// @route    DELETE api/users/delete
// @desc     Delete current user
// @access   Private
const deleteUser =  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id).select('-password');
      console.log(req.user.id);
      console.log('user = ' +user);
  
      if (!user) {
        return res.status(400).json({ msg: 'Can\'t find user' });
      }
      
      res.json(user.name);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }


module.exports = {
    registerUser,loginUser, getUserInfo, deleteUser
} 

