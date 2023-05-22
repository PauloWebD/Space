const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');


const cors = require('cors')

const app = express();
app.use(bodyParser.json());

require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL);


app.use(cors());


// Route pour la page d'administration
app.get('/admin', verifyToken, async (req, res) => {
    try {
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const users = await collection.find().sort({ rank: 1 }).toArray();
        res.render('admin', { users });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
});

// Route pour traiter la soumission du formulaire pour augmenter le rank
app.post('/admin/increase-rank', verifyToken, async (req, res) => {
    try {
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const userId = req.body.userId;
        await collection.findOneAndUpdate({ _id: new ObjectId(userId) }, { $inc: { rank: 1 } });
        res.redirect('/admin?message=Rank increased');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
});

// Route pour traiter la soumission du formulaire pour diminuer le rank
app.post('/admin/decrease-rank', verifyToken, async (req, res) => {
    try {
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const userId = req.body.userId;
        await collection.findOneAndUpdate({ _id: new ObjectId(userId) }, { $inc: { rank: -1 } });
        res.redirect('/admin?message=Rank decreased');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
});


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).send('Token manquant');
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send('Token invalide');
            return;
        }

        req.userId = decoded.id;
        next();
    });
}

// Exemple d'utilisation du middleware
app.get('/api/userInfo', verifyToken, async (req, res) => {
    // Utilisez req.userId pour récupérer l'identifiant de l'utilisateur
    // et renvoyer les informations d'utilisateur correspondantes
});

app.get('/api/signup', async (req, res) => {

});


async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB successfully');
}

connectDB();

// Route pour gérer userInfo
app.get('/api/userInfo/:id', async (req, res) => {
    try {
        const db = client.db('MyTask');
        const collection = db.collection('users');
        const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
        console.log('Document trouvé: ', user);
        res.send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal server error');
    }
});


module.exports = app;
