const League = require('../models/league.model')

const saveLeague = async (league) => {

    try {
    // set the access code to the random number
        league.accessCode = Math.floor(Math.random() * 2000) + 1

        console.log(league.accessCode)
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
}