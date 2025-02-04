import jwt from 'jsonwebtoken';
import redis from '../utils/redisUtility.js';

export const authUserMiddleware = async(req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ errors: 'Unauthorized' });
        }
        const isBlacklisted = await redis.get(token);
        if (isBlacklisted) {
            res.cookie('token', '');
            return res.status(401).json({ errors: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    }
    catch (error) {
        res.status(401).json({ errors: 'Unauthorized' });
    }
}
