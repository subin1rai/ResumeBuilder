const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access Denied: Token missing" });
    }

    try {
      // Verify token with secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach decoded payload to req.user

      // Check roles if provided
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }
  };
};

module.exports = protect;
