const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// Connexion à la base de données MongoDB
const client = new MongoClient(process.env.MONGO_URL);

async function getAllUsers(req, res) {
    try {
        await client.connect();
        console.log('Connexion à la base de données réussie getAllUsers');

        // Récupérer tous les utilisateurs dans la collection "users"
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const users = await collection.find().toArray();

        console.log('Utilisateurs récupérés avec succès getAllUsers');
        res.json({ users });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        res.status(500).json({ message: 'Error retrieving users' });
    } finally {
        // Fermeture de la connexion à la base de données
        // await client.close();
        console.log('Fermeture de la connexion à la base de données getAllUsers');
    }
}

async function deleteUser(req, res) {
    const { userId } = req.params;

    try {
        await client.connect();
        console.log('Connexion à la base de données réussie deleteUser');

        const db = client.db('MyTask');
        const collection = db.collection('users');

        // Supprimer l'utilisateur de la collection "users" en utilisant son ID
        await collection.deleteOne({ _id: new ObjectId(userId) });

        console.log('Utilisateur supprimé avec succès');
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Error deleting user' });
    } finally {
        await client.close();
        console.log('Fermeture de la connexion à la base de données deleteUser');
    }
}

async function updateRank(req, res) {
    const { userId } = req.params;
    const newRank = req.body.rank;

    try {
        // Vérifier le format de userId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        await client.connect();
        console.log('Connexion à la base de données réussie updateRank');

        const db = client.db('MyTask');
        const collection = db.collection('users');

        // Mise à jour du rang de l'utilisateur dans la collection "users"
        await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { rank: newRank } });

        console.log('Mise à jour du rang réussie');
        res.json({ message: 'Rank updated successfully' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du rang', error);
        res.status(500).json({ message: 'Error updating rank' });
    } finally {
        await client.close();
        console.log('Fermeture de la connexion à la base de données updateRank');
    }
}


module.exports = {

    getAllUsers,
    deleteUser,
    updateRank

};