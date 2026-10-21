import type { Request, Response, NextFunction } from 'express';

interface AppError extends Error { status?: number; code?: number }

function errorHandler(err:AppError, req:Request, res:Response, next:NextFunction) {
    if(err.name === 'ValidationError' || err.name === 'CastError')
        res.status(400).json({ error: err.message });
    else if(err.status)
        res.status(err.status).json({error: err.message});
    else if(err.code === 11000)
        res.status(409).json({error: 'Data already exist'})
    else {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export = errorHandler;