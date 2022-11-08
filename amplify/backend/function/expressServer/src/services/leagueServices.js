const League = require('../models/league.model')

const saveLeague = async (league) => {

    try {
      league.accessCode = Math.floor(Math.random() * 80) + 1
      console.log(league.accessCode)
      const newLeague = new League(league)
    //   console.log(newLeague)
        // return("hello")
        return await newLeague.save()
    }  catch (err) {
      if (err.code === 11000 ) { 
        return saveLeague(league)
      } else {
      throw new Error(`Error has occured in saving League.\nError details:\n\t${err}`)
    }}
    
  } 

module.exports = {
    saveLeague,
}