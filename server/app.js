const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { connectDB } = require('./db');
const { MongoClient } = require('mongodb');
const adminController = require('./controllers/adminController');


// Middleware pour parser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware CORS pour autoriser les requêtes provenant du frontend
app.use(cors());



// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connexion à la base de données réussie');
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données', error);
    });

// Import des routes
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Utilisation des routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Route GET pour createMessage
app.get('/api/messages/createMessage', (req, res) => {
    res.send('Hello, World!');
});
const client = new MongoClient(process.env.MONGO_URL);
app.get('/api/messages', async (req, res) => {


    try {
        const db = client.db('MyTask');
        const collection = db.collection('messages');
        const messages = await collection.find().toArray();
        res.json({ messages });
    } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
    }
});

app.get('/api/users/allUsers', adminController.getAllUsers);
app.get('/api/users/updateRank', adminController.updateRank);
app.delete('/api/users/deleteUsers', adminController.deleteUser);



// Démarrage du serveur
app.listen(3001, () => {
    console.log('Backend server is running on port 3001');
});


connectDB();