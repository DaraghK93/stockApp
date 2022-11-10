/// Description:
//      Contains routes under the main route api/league
const express = require("express");
const router = express.Router()
const {protectedRoute} = require('../middleware/authMiddleware');

const {createLeague, getPublicLeagues, joinLeaguebyCode} = require('../controllers/leagueController');

router.post('/createleague',protectedRoute,createLeague)
router.get('/',protectedRoute, getPublicLeagues)
router.post('/joinleague',protectedRoute,joinLeaguebyCode)
module.exports = router 