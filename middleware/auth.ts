import jwt from 'jsonwebtoken';
import httpError from '../utils/httpError';
import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/authRequest';

function auth(req:AuthRequest, res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        throw httpError(401, 'Not authenticated');
    const [, token] = authHeader.split(' ');
    if(!token)
        throw httpError(401, 'Invalid or expired token');
    const secret = process.env.JWT_SECRET;
    if(!secret)
        throw httpError(500, 'Server error');
    try{
        const payload = jwt.verify(token, secret);
        if(typeof payload === 'string')
            throw httpError(401, 'Invalid or expired token');
        req.userId = payload.id;
        next();
    } catch (err){
        throw httpError(401, 'Invalid or expired token');
    }
}

export = auth;