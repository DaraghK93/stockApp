const League = require('../models/league.model')
const User = require('../models/user.model')
const portfolioServices = require('../services/portfolioServices')


const joinLeague = async(league,user) => {
 
  try{

    // get the values we need
    let {users,leagueName,portfolios,startingBalance,_id} = league

    // send an error back if the user is already in the league
    if (users.includes(user)){
      return {error:400, errormessage:"Already in this Game"}
    }

//  set portfolio object to send
    const portfolio  = {
      portfolioName: `${leagueName} Portfolio`,
      startingBalance,
      userId: user,
      leagueId:_id,
    }
    // send portfolio object to services and return the portfolio if it is created
    const leaguePortfolio = await portfolioServices.createPortfolio(portfolio)

    // send an error if the portfolio is already in the league
    if (portfolios.includes(leaguePortfolio._id)){
      return {error:400, errormessage:"portfolio already in league"}
    }

    //update the user object with the leagueId
    await User.updateOne({ _id: user }, {$push: {leagues: _id}})

    // update the league object with user and portfolio Ids
    league = await League.findOneAndUpdate({ _id: _id }, {$push: {users: user,portfolios:leaguePortfolio._id}},{returnDocument: "after"})

    return league

  } catch (err) {
    
    throw new Error(`Error has occured in joining League.\nError details:\n\t${err}`)
  }
}


const saveLeague = async (league) => {
    try {

// random gen from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// author: Or Duan

        // generate random string of length 6 of  ints and letters
        league.accessCode = [...Array(6)].map(() => Math.random().toString(36)[2]).join('')
        // new League object
        const newLeague = new League(league)
        return await newLeague.save()

    } catch (err) {

      if (err.code === 11000 ) { 
        return saveLeague(league)
      } else {
      throw new Error(`Error has occured in saving League.\nError details:\n\t${err}`)
    }}
    
  } 



module.exports = {
    saveLeague,
    joinLeague
}