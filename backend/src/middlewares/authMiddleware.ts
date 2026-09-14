import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token: string | undefined;

    if (req.header("Authorization")) {
      token = req.header("Authorization")?.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route, token not provided",
      });
    }

    const decode = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;
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
      message: "Not authorized to access this route, token invalid or expired",
    });
  }
};
