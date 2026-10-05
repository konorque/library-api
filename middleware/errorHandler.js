function errorHandler(err, req, res, next) {
    if(err.name === 'ValidationError' || err.name === 'CastError')
        res.status(400).json({ error: err.message });
    else if(err.status)
        res.status(err.status).json({error: err.message});
    else if(err.code === 11000)
        res.status(409).json({error: 'Data already exist'})
    else
        res.status(500).json({ error: err.message });

}

module.exports = errorHandler;