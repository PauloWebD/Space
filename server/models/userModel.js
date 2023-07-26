const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    favoritePlanet: String,
    rank: {
        type: String,
        enum: ['Débutant', 'Avancé', 'Expert'],
        default: 'Débutant',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});



const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
