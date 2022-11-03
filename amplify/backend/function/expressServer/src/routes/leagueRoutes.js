/// Description:
//      Contains routes under the main route api/league
const express = require("express");
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const {createLeague, getPublicLeagues} = require('../controllers/leagueController');

router.post('/createleague',auth,createLeague)
router.get('/',auth, getPublicLeagues)

module.exports = router 