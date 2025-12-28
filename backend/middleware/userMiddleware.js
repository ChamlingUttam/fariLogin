import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    if (!authHead || !authHead.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHead.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed or expired" });
  }
};
