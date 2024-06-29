const jwt = require('jsonwebtoken');
module.exports=function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = req.headers.token;
    }
    if (!token) {
        return res.status(401).json({ meassge: 'Unauthorized: Missing token' })
    }
    try {
        const decoded = jwt.verify(token, 'hello world')
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}