const dotenv = require('dotenv');
dotenv.config();

const Message = require('../models/messageModel');
const User = require('../models/userModel');

async function createMessage(req, res) {
    try {
        const { userId, message } = req.body;

        // Recherche de l'utilisateur correspondant dans la base de données
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }

        const newMessage = new Message({
            userId,
            message,
        });

        // Enregistrement du message dans la base de données
        await newMessage.save();

        console.log('Message créé avec succès');
        res.status(200).json({ success: true, message: 'Message créé avec succès' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erreur lors de la création du message' });
    }
}

module.exports = {
    createMessage,
};
