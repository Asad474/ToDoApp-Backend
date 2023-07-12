const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true  
    },

    token: {
        type: String,
        requierd: true  
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10*86400
    }
});

module.exports = mongoose.model('UserToken', UserTokenSchema);