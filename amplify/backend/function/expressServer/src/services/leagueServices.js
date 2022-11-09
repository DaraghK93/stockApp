const League = require('../models/league.model')

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
}