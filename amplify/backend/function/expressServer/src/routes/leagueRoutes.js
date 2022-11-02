/// Description:
//      Contains routes under the main route api/league
const express = require("express");
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const {createLeague, getLeagues} = require('../controllers/leagueController');

router.post('/createleague',auth,createLeague)
router.get('/', getLeagues)

module.exports = router 