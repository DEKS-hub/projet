import express from 'express';
const router = express.Router();
import authControl from '../controllers/authController.js'; // Assurez-vous que le chemin est correct

router.post('/register', authControl.register);
router.post('/login', authControl.login);
//  Ajoute d'autres routes d'authentification (vérification d'email, etc.)


export default router; // Utilisez export default pour exporter le router dans un module ES