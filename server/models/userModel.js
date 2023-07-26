const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    favoritePlanet: String,
    rank: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});



const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
