const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.post('/register', authControl.register);
router.post('/login', authControl.login);
//  Ajoute d'autres routes d'authentification (vérification d'email, etc.)
export default router;