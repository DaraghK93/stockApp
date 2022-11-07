const jwt = require('jsonwebtoken');
const getJWTSecret = require("../utils/JWT")

async function protectedRoute(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // Verify token
    try {
        // Get the JWT secret 
        const jwtSecret = await getJWTSecret()
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid'});
    }
}

module.exports = {
    protectedRoute
}