// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  console.log('Checking authentication...');
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      console.log('Invalid token', err);
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = decoded;  // Attach decoded user info to request object
    console.log('User authenticated:', decoded);
    next();
  });
};
