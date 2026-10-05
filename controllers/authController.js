const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpError = require('../utils/httpError');

async function register (req, res){
    const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
    const password = req.body.password;
    if(!username || typeof password !== 'string' || !password)
        throw httpError(400, 'Wrong username or password');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username: username, password: hashedPassword});
    res.status(201).json({message: `User ${newUser.username} created successfully`});
};

async function login(req, res){
    const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
    const password = req.body.password;
    if(!username || typeof password !== 'string' || !password)
        throw httpError(400, 'Wrong username or password');

    const user = await User.findOne({username: username}).select('+password');
    const passwordMatches = user && await bcrypt.compare(password, user.password);
    if(!passwordMatches)
        throw httpError(401, 'Invalid login or password');
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token: token});
}

module.exports = {register, login};