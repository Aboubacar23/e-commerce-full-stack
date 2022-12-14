const jwt = require('jsonwebtoken');

module.exports  = (req, res, next) => {
    try{
        const token = req.headers.authorization.split('')[1];
        const decodeToken = jwt.verify(token, 'MON_TOKEN_SECRET');
        if(req.body.userId && req.body.userId !== decodeToken.userId){
            return res.status(401).json({
                status : 401,
                message: 'Invalid usr ID'
            });
        }
        else {
            next();
        }
    }
    catch(error){
        return res.status(500).json({
            status : 500,
            message: error.message
        });

    }
}