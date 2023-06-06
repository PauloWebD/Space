// userController.js
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { getDB } = require('../db');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);



async function signup(req, res) {
    const { username, password, email, favoritePlanet } = req.body;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie signup');

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
        console.log('Fermeture de la connexion à la base de données signup');
    }
}



async function login(req, res) {
    const { username, password } = req.body;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie login');

        // Recherche de l'utilisateur dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const user = await collection.findOne({ username });

        // Vérification du mot de passe
        if (user && user.password === password) {
            console.log('Utilisateur connecté avec succès login');
            res.json({ message: 'Login successful', user });
        } else {
            console.log('Nom d\'utilisateur ou mot de passe incorrect');
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur', error);
        res.status(500).json({ message: 'Error logging in' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
        console.log('Fermeture de la connexion à la base de données login');
    }
}

async function getUser(req, res) {
    const { id } = req.params;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie getUser');

        // Recherche de l'utilisateur dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        console.log('ID:', id);
        const user = await collection.findOne({ _id: new ObjectId(id) });


        if (user) {
            console.log('Utilisateur trouvé avec succès getUser');
            res.json({ user });
        } else {
            console.log('Utilisateur non trouvé getUser');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur', error);
        res.status(500).json({ message: 'Error retrieving user' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
        console.log('Fermeture de la connexion à la base de données getUser');
    }
}

async function getMessages(req, res) {
    const { userId } = req.params;
    const db = getDB(); // Récupérez la référence à la base de données à partir du module db.js

    try {
        // Recherche des messages de l'utilisateur dans la collection "messages"
        const collection = db.collection('messages');
        const messages = await collection.find({ userId: new ObjectId(userId) }).toArray();

        console.log('Messages récupérés avec succès getMessages');
        res.json({ messages });
    } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    }
}

module.exports = {
    signup,
    login,
    getUser,
    getMessages,
};