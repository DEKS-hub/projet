const { query } = require('../config/db'); // Fonction pour faire des requêtes à la DB
const bcrypt = require('bcryptjs');

const registerUser = async (fullName, phone, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await query(`
    INSERT INTO users (fullName, phone, email, password)
    VALUES (?, ?, ?, ?)
  `, [fullName, phone, email, hashedPassword]);

  const userId = result.insertId;
  const [user] = await query(`SELECT id, fullName, phone, email FROM users WHERE id = ?`, [userId]);
  return user[0];
};

const loginUser = async (identifier, password) => {
  const [users] = await query(`
    SELECT * FROM users WHERE phone = ? OR email = ?
  `, [identifier, identifier]);
  const user = users[0];

  if (!user) {
    throw new Error('Invalid credentials'); // Ou une erreur plus spécifique
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, fullName: user.fullName, phone: user.phone, email: user.email }; // Ne renvoie pas le mot de passe
};

module.exports = { registerUser, loginUser };