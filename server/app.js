const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Middleware pour parser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware CORS pour autoriser les requêtes provenant du frontend
app.use(cors());

// Import des routes
const userRoutes = require('./routes/userRoutes');
// ...

// Utilisation des routes
app.use('/api/users', userRoutes);
// ...

// Démarrage du serveur
app.listen(3001, () => {
    console.log('Backend server is running on port 3001');
});
