const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);

const Message = require('../models/messageModel');
const User = require('../models/userModel');

async function createMessage(req, res) {
    try {
        const { userId, message } = req.body;

        await client.connect();
        console.log('Connexion à la base de données réussie');

        // Recherche de l'utilisateur correspondant dans la base de données
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }

        const db = client.db('MyTask');
        const collection = db.collection('Message');

        // Insertion du message dans la collection
        await collection.insertOne({
            userId,
            message,
        });

        console.log('Message créé avec succès');
        res.status(200).json({ success: true, message: 'Message créé avec succès' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erreur lors de la création du message' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
        console.log('Fermeture de la connexion à la base de données createMessage');
    }
}

module.exports = {
    createMessage,
};
