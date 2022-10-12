/// Description ///
//  This file holds all the controllers for the route /api/newsarticles


const getNewsArticles = async (req, res, next) => { 
    try{
        res.json("Test")
    }catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error';
        return next(err);
  }
}


module.exports = {
    getNewsArticles
};