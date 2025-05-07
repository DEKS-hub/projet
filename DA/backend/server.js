import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Configurer la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bonjour',
});

// Vérifier la connexion MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL!');
});

// Route pour récupérer les utilisateurs
app.get('/users', (_, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
    res.json(results);
  });
});

// Route pour l'enregistrement
app.post('/api/register', (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (name, phone, password) VALUES (?, ?, ?)';
  db.query(query, [name, phone, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création du compte.' });
    }
    res.status(201).json({ message: 'Compte créé avec succès.' });
  });
});

// Route pour la connexion
app.post('/api/login', (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Numéro de téléphone et mot de passe requis.' });
  }

  const query = 'SELECT * FROM users WHERE phone = ?';
  db.query(query, [phone], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie.', user: { id: user.id, name: user.name, phone: user.phone } });
  });
});

// Route pour la réinitialisation du mot de passe
app.post('/api/forgot-password', (req, res) => {
  const { phone, newPassword } = req.body;

  if (!phone || !newPassword) {
    return res.status(400).json({ message: 'Numéro et nouveau mot de passe requis.' });
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  const query = 'UPDATE users SET password = ? WHERE phone = ?';
  db.query(query, [hashedPassword, phone], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  });
});



// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Le serveur backend est en cours d'exécution sur http://0.0.0.0:${port}`);
});
