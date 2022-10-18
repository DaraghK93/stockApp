// description:
// this file holds the service functions for stocks
// these functions may need to be used in multiple files or multiple times within one file


// this function gets the top stocks for each ESG category, depending on the category passed as
// the "rating" argument
const getTopESG = (array,rating) => {
  // empty array to story stocks and relevant E,S or G score
    scores = []
    // loop through creating the object that holds only the ticker symbol 
    // and the score. add this to the array
    array.forEach((object) => {
      const newobj = {}
      newobj.symbol = object.symbol
      newobj[rating] = object.esgrating[rating]
      scores.push(newobj)
    })
    
    //sort them and get top 20
    scores.sort((a,b) => b[rating] -a[rating])
    top20Scores = scores.slice(0,20)
    
    return top20Scores

}


module.exports = {
 getTopESG
}