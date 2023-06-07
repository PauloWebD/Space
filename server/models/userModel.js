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
});

// Vérifiez si le modèle User existe déjà avant de le créer
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
