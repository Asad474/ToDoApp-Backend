const UserToken = require('../models/usertokenmodel');
const jwt = require('jsonwebtoken');

module.exports = async(refreshToken) => {
    try{
        const private_key = process.env.REFRESHTOKEN_SECRET;

        const token = await UserToken.findOne({token: refreshToken});
        if (!token){
            throw {error: true, message: "Invalid Refresh Token"};
        }

        const tokenDetails = await jwt.verify(refreshToken, private_key);
        return {
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        };

    } catch(err){
        throw err;
    }
}