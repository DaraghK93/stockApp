// @desc Register new uesr
// @route POST /api/users
// @access Public

const registerUser = (req,res) => {
    res.json({ message: 'Register User' })
}


//@desc Authenticate USer
// route POST /api/users/login
// @access Public

const loginUser = (req,res) => {
    res.json({ message: 'Login User' })
}

// @desc get user data
// route get /api/users/info
// @access Public

const getUserInfo = (req,res) => {
    res.json({ message: 'User data display' })
}


module.exports = {
    registerUser,loginUser, getUserInfo
} 