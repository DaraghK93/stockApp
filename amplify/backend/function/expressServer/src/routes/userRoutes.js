const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/info',auth, getUserInfo)

module.exports = router