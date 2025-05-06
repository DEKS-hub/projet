const { validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../models/User'); // Importe les fonctions du modèle
const { generateToken } = require('../utils/auth'); // Fonction pour générer les JWT

const authControl = { // Assurez-vous que le nom correspond à celui utilisé dans vos routes
  register: async (req, res, next) => {
    // Validation des données (express-validator)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, phone, email, password } = req.body;
      const user = await registerUser(fullName, phone, email, password); // Utilise la fonction du modèle
      const token = generateToken(user.id);
      res.status(201).json({ user, token, message: 'User registered successfully' });
    } catch (error) {
      next(error); // Passe l'erreur au middleware de gestion des erreurs
    }
  },

  login: async (req, res, next) => {
    try {
      const { identifier, password } = req.body; // 'identifier' peut être phone ou email
      const user = await loginUser(identifier, password); // Utilise la fonction du modèle
      const token = generateToken(user.id);
      res.json({ user, token, message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  },

  //  Ajoute d'autres fonctions pour la vérification d'email, etc.
};

module.exports = authControl; // Exportez bien l'objet contrôleur