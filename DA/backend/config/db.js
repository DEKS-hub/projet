const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bonjour',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('Connected to MySQL Database');
    connection.release(); // Release the connection back to the pool

    // Test the connection
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Database connection test:', rows);
    return pool;

  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Quitte l'application si la connexion échoue
  }
};

module.exports = { connectDB };