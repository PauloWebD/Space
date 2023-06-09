const { ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);

async function createMessage(req, res) {
    const { userId, message, planet } = req.body;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie createMessage');

        // Recherche de l'utilisateur correspondant dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
        }

        const newMessage = {
            userId,
            message,
            planet
        };

        // Insertion du message dans la collection "messages"
        await db.collection('messages').insertOne(newMessage);

        console.log('Message créé avec succès');
        res.status(200).json({ success: true, message: 'Message créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création du message', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la création du message' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
        console.log('Fermeture de la connexion à la base de données createMessage');
    }
}

async function getMessages(req, res) {
    const { planet } = req.params;
    console.log("plan==>", req.params);
    try {
        await client.connect(); // Connectez-vous à la base de données
        console.log('Connexion à la base de données réussie getMessages');

        const db = client.db('MyTask');
        const collection = db.collection('messages');
        const messages = await collection.find({ planet: planet }).toArray();
        res.json({ messages });
    } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    } finally {
        // Ne fermez pas la connexion à la base de données ici
        console.log('Fermeture de la connexion à la base de données getMessages');
    }
}

module.exports = {
    createMessage,
    getMessages
};
