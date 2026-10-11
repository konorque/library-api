import User from '../models/User';
import bcrypt from'bcrypt';
import jwt from'jsonwebtoken';
import httpError from'../utils/httpError';
import type { Request, Response } from 'express';

async function register (req:Request, res:Response){
    const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
    const password = req.body.password;
    if(!username || typeof password !== 'string' || !password)
        throw httpError(400, 'Wrong username or password');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username: username, password: hashedPassword});
    res.status(201).json({message: `User ${newUser.username} created successfully`});
};

async function login(req:Request, res:Response){
    const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
    const password = req.body.password;
    if(!username || typeof password !== 'string' || !password)
        throw httpError(400, 'Wrong username or password');

    const user = await User.findOne({username: username}).select('+password');
    const passwordMatches = user && await bcrypt.compare(password, user.password);
    if(!passwordMatches)
        throw httpError(401, 'Invalid login or password');
    const secret = process.env.JWT_SECRET;
    if(!secret)
        throw httpError(500, 'Server error');
    const token = jwt.sign({id: user._id}, secret, {expiresIn: '1h'});
    res.json({token: token});
}

module.exports = {register, login};