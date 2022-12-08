/// Description:
//      Contains routes under the main route api/league
const express = require("express");
const router = express.Router()
const {protectedRoute} = require('../middleware/authMiddleware');

const {createLeague, getPublicLeagues, joinLeaguebyCode, getMyLeagues,getLeagueById, leaveLeague, deleteLeague} = require('../controllers/leagueController');

router.post('/createleague',protectedRoute,createLeague)
router.get('/',protectedRoute, getPublicLeagues)
router.get('/myleagues',protectedRoute,getMyLeagues)
router.post('/joinleague',protectedRoute,joinLeaguebyCode)
router.get('/:leagueId',protectedRoute,getLeagueById)
router.put('/deleteleague',protectedRoute,deleteLeague)
router.post('/leaveLeague',protectedRoute, leaveLeague)



module.exports = router 