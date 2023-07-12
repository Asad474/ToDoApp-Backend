const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const loginuser = async(req, res) => {
    try{
        const {email, password} = req.body;

        if (!(email && password)){
            return res.status(400).json('All inputs are required.');
        } 

        const user = await User.findOne({email});
        if (!user){
            return res.status(200).json('User does not exist.');
        }

        if (user.email && (await bcrypt.compare(password, user.password))){
            const {access_token, refresh_token} = await generateToken(user.id);

            return res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email, 
                access_token,
                refresh_token
            });
        }

    } catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error.');
    }
}

const registeruser = async(req, res) => {
    try{
        const {username, email, password} = req.body;
        console.log(username, email, password);

        if (!(username && email && password)){
            return res.status(400).json('All inputs are required.');
        }

        const usr = await User.findOne({username});
        if (usr){
            return res.status(400).json('User with this username already exists.');
        } 

        const oldUser = await User.findOne({email});
        if (oldUser){
            return res.status(400).json('User already registered. Please login');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);    

        const user = await User.create({username, email, password: hashedpassword});
        if (user){
            return res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email,
            });
        }

        return res.status(400).json('Something went to wrong!!!');   
    }
    catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error.')
    }
}


module.exports = {
    loginuser,
    registeruser
};