/// Description:
//      Contains routes under the main route api/newsarticles
const express = require("express")
const router = express.Router()

/// Controllers ///
const {getNewsArticles} = require('../controllers/newsArticleController');

/// Get /api/newsarticles ///
//  Description:
//      Gets newsarticles from database 
//  Access Control
//      Public
//  Query Parameters 
//      
router.get('/',getNewsArticles)

module.exports = router;
