const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo, deleteUser } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/info',auth, getUserInfo)
router.delete('/delete',auth, deleteUser)

module.exports = router