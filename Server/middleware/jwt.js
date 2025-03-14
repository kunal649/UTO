const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  console.log("Received Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
