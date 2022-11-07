const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo, deleteUser } = require('../controllers/userController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/info',protectedRoute, getUserInfo)
router.delete('/delete',protectedRoute, deleteUser)

module.exports = router