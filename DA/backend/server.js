const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Pour gérer les requêtes cross-origin (si nécessaire)
const { connectDB } = require('./config/db'); // Fonction pour se connecter à la base de données (MySQL)
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { errorHandler } = require('./utils/errorHandler'); // Middleware pour gérer les erreurs
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Autorise toutes les origines (à configurer en production)
app.use(bodyParser.json()); // Analyse les corps de requête JSON

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Routes d'authentification (login, register, etc.)
app.use('/api/users', userRoutes); // Routes pour les utilisateurs (profil, etc.)
app.use('/api/transactions', transactionRoutes); // Routes pour les transactions

// Middleware de gestion des erreurs
app.use(errorHandler);

// Route de base (pour vérifier que le serveur fonctionne)
app.get('/', (req, res) => {
  res.send('DA Transfer Server is running!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export pour les tests (si tu veux écrire des tests unitaires pour le serveur)