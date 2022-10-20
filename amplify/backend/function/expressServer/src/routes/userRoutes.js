const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUserInfo, deleteUser, createPortfolio } = require('../controllers/userController')
const auth = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/info',auth, getUserInfo)
router.delete('/delete',auth, deleteUser)
router.post('/createPortfolio', createPortfolio)

module.exports = router