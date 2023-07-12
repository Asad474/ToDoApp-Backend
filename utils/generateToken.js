const jwt = require('jsonwebtoken');
const UserToken = require('../models/usertokenmodel');


module.exports = async(id) => {
    try{
        const access_token = jwt.sign({id}, process.env.ACCESSTOKEN_SECRET, {
            expiresIn: '15m'
        });
    
        const refresh_token = jwt.sign({id}, process.env.REFRESHTOKEN_SECRET, {
            expiresIn: '10d'
        })
    
        const usertoken = await UserToken.findOne({userId: id});
        if (usertoken){
            await UserToken.deleteOne({userId: id});
        }

        await new UserToken({userId: id, token: refresh_token}).save();
    
        return Promise.resolve({access_token, refresh_token});
    } catch(err){
        throw Promise.reject(err);
    }
};