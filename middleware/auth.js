const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'eazyERP';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = {
    verifyToken
};
