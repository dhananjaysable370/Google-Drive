import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { userId: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token is not valid.' });
    }
};

export default authMiddleware;
