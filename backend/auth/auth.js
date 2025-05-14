import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const GenerateToken = (user) => {
  try {
    const token = jwt.sign(
      { username: user.username, id: user.id },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export const VerifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Expirated token" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;

    next();
  });
};
