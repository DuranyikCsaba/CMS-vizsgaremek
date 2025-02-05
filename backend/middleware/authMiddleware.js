import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token szükséges a hozzáféréshez.' });
  }

  jwt.verify(token, 'titkoskulcs123', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Érvénytelen vagy lejárt token!' });
    }

    req.user = user;
    next();
  });
};