const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secret_key"; 

const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7); // 
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };
