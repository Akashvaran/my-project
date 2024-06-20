import jwt from 'jsonwebtoken';
import authenticationModel from '../model/authithantication.js';

export const Verification = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: false, msg: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = await authenticationModel.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ status: false, msg: "Unauthorized: User not found" });
        }
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ status: false, msg: "Unauthorized: Invalid token" });
    }
};