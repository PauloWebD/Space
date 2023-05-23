const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

// Middleware pour parser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware CORS pour autoriser les requêtes provenant du frontend
app.use(cors());

// Route pour la création d'utilisateur
app.post('/api/signup', async (req, res) => {
    const { username, password, email, favoritePlanet } = req.body;

    // Connexion à la base de données MongoDB
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();
        console.log('Connexion à la base de données réussie');

        // Insertion de l'utilisateur dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        await collection.insertOne({
            username,
            password,
            email,
            favoritePlanet
        });

        console.log('Utilisateur créé avec succès');
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur', error);
        res.status(500).json({ message: 'Error creating user' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
    }
});

// Démarrage du serveur
app.listen(3001, () => {
    console.log('Backend server is running on port 3001');
});
