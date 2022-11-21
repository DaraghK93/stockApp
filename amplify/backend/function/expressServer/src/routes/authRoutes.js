/// Description:
//      Contains routes under the main route api/league
const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/authMiddleware');
const { changeUserDetails } = require('../controllers/authController');

router.post('/changeUserDetails', protectedRoute, changeUserDetails);

module.exports = router;
