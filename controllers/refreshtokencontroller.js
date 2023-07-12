const verifyRefreshToken = require('../utils/verifyRefreshToken');
const jwt = require('jsonwebtoken');
const UserToken = require('../models/usertokenmodel');

const newAccessToken = async(req, res) => {
    try{
        const {tokenDetails} = await verifyRefreshToken(req.body.refreshToken);

        const access_token = jwt.sign({id: tokenDetails.id}, process.env.ACCESSTOKEN_SECRET, {
            expiresIn: '15m'
        });

        res.status(200).json(access_token);
    } catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error.');
    }
};


const logout = async(req, res) => {
    try{
        const userToken = await UserToken.findOne({token: req.body.refreshToken});
        if (!userToken){
            return res.status(200).json('Logged Out Successfully...');
        }

        await UserToken.deleteOne({token: req.body.refreshToken});
        res.status(200).json('Logged Out Successfully...');
    } catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error.');
    }
};


module.exports = {
    newAccessToken,
    logout,
};