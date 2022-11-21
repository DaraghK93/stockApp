/// Description:
//      Contains routes under the main route api/league
const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../middleware/authMiddleware');

router.post('/changeUserDetails', protectedRoute, changeUserDetails);

module.exports = router;
