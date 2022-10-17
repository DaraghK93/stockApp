// description:
// this file holds the service functions for stocks
// these functions may need to be used in multiple files or multiple times within one file

const getTopESG = (array,rating) => {
    scores = []
    array.forEach((object) => {
      const newobj = {}
      newobj.symbol = object.symbol
      newobj[rating] = object.esgrating[rating]
      scores.push(newobj)
    })
    //sort them and get top 20
    scores.sort((a,b) => b.e -a.e)
    top20Scores = scores.slice(0,20)
    
    return top20Scores

}


module.exports = {
 getTopESG
}