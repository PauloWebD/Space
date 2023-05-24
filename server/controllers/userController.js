// userController.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);

async function login(req, res) {
    const { username, password } = req.body;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie');

        // Recherche de l'utilisateur dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const user = await collection.findOne({ username });

        // Vérification du mot de passe
        if (user && user.password === password) {
            console.log('Utilisateur connecté avec succès');
            res.json({ message: 'Login successful' });
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
    }
}

async function signup(req, res) {
    const { username, password, email, favoritePlanet } = req.body;

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
}

module.exports = {
    login,
    signup,
    // ...
};
