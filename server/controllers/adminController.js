const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);
let db; // Gardons une référence à la base de données

// Connectons-nous à la base de données avant de démarrer le serveur
(async () => {
    try {
        await client.connect();
        db = client.db('MyTask');
        console.log('Connexion à la base de données réussie');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données', error);
    }
})();

// Fonction de récupération de tous les utilisateurs
async function getAllUsers(req, res) {
    try {
        // Récupérer tous les utilisateurs dans la collection "users"
        const collection = db.collection('users');
        const users = await collection.find().toArray();
        console.log('Utilisateurs récupérés avec succès');
        res.json({ users });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
}

// Fonction de suppression d'un utilisateur
async function deleteUser(req, res) {
    const { userId } = req.params;

    try {
        const collection = db.collection('users');
        // Supprimer l'utilisateur de la collection "users" en utilisant son ID
        await collection.deleteOne({ _id: new ObjectId(userId) });
        console.log('Utilisateur supprimé avec succès');
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

async function updateUserRank(req, res) {
    const { userId } = req.params;
    const { rank } = req.body;

    try {
        const collection = db.collection('users');
        // Mettre à jour le rang de l'utilisateur en utilisant son ID
        await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { rank } });

        console.log('Rang de l\'utilisateur mis à jour avec succès');
        res.json({ message: 'User rank updated successfully' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du rang de l\'utilisateur', error);
        res.status(500).json({ message: 'Error updating user rank' });
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    updateUserRank
};
