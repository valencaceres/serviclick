import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any; 
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log(req.headers);

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('no token')
    return res.status(401).json({ error: 'Token not provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;

    next();
  });
};
export default authMiddleware;