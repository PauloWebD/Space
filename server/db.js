// db.js (nouveau fichier)
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const url = process.env.MONGO_URL;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db; // variable pour stocker la référence à la base de données

async function connectDB() {
    try {
        await client.connect();
        console.log('Connexion à la base de données réussie');
        db = client.db('MyTask');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données', error);
    }
}

function getDB() {
    return db;
}

module.exports = {
    connectDB,
    getDB,
    ObjectId
};
