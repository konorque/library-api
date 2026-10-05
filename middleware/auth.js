const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json('Not authorizated');
    const [, token] = authHeader.split(' ');
    try{
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch (err){
        res.status(401).json('Error');
    }
}

module.exports = auth;