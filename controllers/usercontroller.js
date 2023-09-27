const asyncHandler = require('express-async-handler');

const User = require('../models/usermodel');
const generateToken = require('../utils/generateToken');

const loginuser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if (!(email && password)){
        res.status(400);
        throw new Error('All input details are required.');
    } 

    const user = await User.findOne({email});

    if (!user){
        res.status(400);
        throw new Error('User does not exist.');
    }

    if (user.email && await user.matchPassword(password)){
        const {access_token, refresh_token} = await generateToken(user.id);

        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email, 
            access_token,
            refresh_token
        });
    } else{
        res.status(400);
        throw new Error('Invalid Email or Password.');
    }    
});


const registeruser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if (!(name && email && password)){
        res.status(400);
        throw new Error('All inputs are required.');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser){
        res.status(400);
        throw new Error('User already registered. Please login');
    };

    const user = await User.create({name, email, password});

    if (user){
        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else{
        res.status(400);
        throw new Error('Invalid User data!!!');   
    };
});


module.exports = {
    loginuser,
    registeruser,
};