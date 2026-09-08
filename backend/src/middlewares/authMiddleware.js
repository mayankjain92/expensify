import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || "FALLBACK_SECRET",
    );
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};
