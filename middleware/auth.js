const jwt = require('jsonwebtoken');
const httpError = require('../utils/httpError');

function auth(req, res, next) {
    let authHeader = req.headers.authorization;
    if(!authHeader)
        throw httpError(401, 'Not authenticated');
    const [, token] = authHeader.split(' ');
    try{
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch (err){
        throw httpError(401, 'Invalid or expired token');
    }
}

module.exports = auth;