const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch(err){
            console.log(err);
            return res.status(401).json('Not Authorized.');
        }        
    }

    if (!token){
        return res.status(401).json('Not Authorized, no token.');
    };
}