import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Pour gérer les requêtes cross-origin (si nécessaire)
import { connectDB } from './config/db.js'; //// Fonction pour se connecter à la base de données (MySQL)
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './utils/errorHandler.js'; // Middleware pour gérer les erreurs (assurez-vous de l'exportation nommée dans errorHandler.js)

const app = express();
const port = process.env.PORT || 5000; // Utilisez une variable d'environnement pour le port ou 5000 par défaut

// Middleware
app.use(cors()); // Autorise toutes les origines (à configurer en production avec des options spécifiques)
app.use(bodyParser.json()); // Analyse les corps de requête JSON

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes); // Routes d'authentification (login, register, etc.)

// Middleware de gestion des erreurs
app.use(errorHandler);

// Route de base (pour vérifier que le serveur fonctionne)
app.get('/', (_req, res) => {
  res.send('DA Transfer Server is running!');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Si vous utilisez "type": "module" dans package.json, vous n'avez pas besoin de module.exports
// Si vous ne l'utilisez pas, cette ligne pourrait être nécessaire pour certains tests.
// Cependant, avec "type": "module", il est préférable d'utiliser export default app;
// module.exports = app;