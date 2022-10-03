const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/info', getUserInfo)

module.exports = router