const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
        
    const token = req.header('xHeader');
    if (!token) return res.status(400).send('invalid token');
    
    try{
        const verified = jwt.verify(token, process.env.jwt)
        req.user = verified;
        console.log(verified);
        next();

    } catch(err) {
        res.status(400).send(err);
    }
};