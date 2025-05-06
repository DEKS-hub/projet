export const errorHandler = (err, req, res, next) => {
  console.error(err); // Log l'erreur pour le débogage
  
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof Error) {
    message = err.message;
    if (message === 'Invalid credentials') {
      statusCode = 401; // Unauthorized
    }
    //  Ajoute d'autres cas pour des erreurs spécifiques
  }

  res.status(statusCode).json({ error: message });
  // Votre logique de gestion des erreurs ici
};
  
  module.exports = errorHandler;