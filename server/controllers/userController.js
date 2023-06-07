const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
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
            favoritePlanet,
            rank: 'Débutant' // Par défaut, le rang est défini à "Débutant"
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


function generateAuthToken() {
    const token = jwt.sign({ _id: this._id }, 'toto', { expiresIn: '24h' });
    return token;
};

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
            console.log('test1 ==>', this._id);
            const token = generateAuthToken();
            console.log('test2 ==>', token);
            res.json({ message: 'Login successful', user, token: token });
            // Les informations d'identification sont valides, générer un token JWT

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
        // await client.close();
        console.log('Fermeture de la connexion à la base de données getUser');
    }
}

async function getMessages(req, res) {
    const { userId } = req.params;

    try {
        await client.connect(); // Connectez-vous à la base de données
        console.log('Connexion à la base de données réussie getMessages');

        const db = client.db('MyTask');
        const collection = db.collection('messages');
        const messages = await collection.find({ userId: userId }).toArray();
        console.log('UserID:', userId);
        console.log('Messages récupérés avec succès:', messages);
        res.json({ messages });
    } catch (error) {
        console.error('Erreur lors de la récupération des messages', error);
        res.status(500).json({ message: 'Error retrieving messages' });
    } finally {
        // Ne fermez pas la connexion à la base de données ici
        console.log('Fermeture de la connexion à la base de données getMessages');
    }
}


const updateRank = async (req, res) => {
    try {
        const userId = req.params.userId;
        const newRank = req.body.rank;

        // Vérifier le format de userId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Connexion à la base de données
        await client.connect();
        console.log('Connexion à la base de données réussie updateRank');

        // Mise à jour du rang de l'utilisateur dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { rank: newRank } });


        console.log('Mise à jour du rang réussie');
        res.json({ message: 'Rank updated successfully' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du rang', error);
        res.status(500).json({ message: 'Error updating rank' });
    } finally {
        // Fermeture de la connexion à la base de données
        await client.close();
        console.log('Fermeture de la connexion à la base de données updateRank');
    }
};


module.exports = {
    signup,
    login,
    getUser,
    getMessages,
    updateRank
};
