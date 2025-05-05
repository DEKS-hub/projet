const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { // Utilise une variable d'environnement pour le secret
    expiresIn: '1h' // Durée de vie du token
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

module.exports = { generateToken, verifyToken };