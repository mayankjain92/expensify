import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import User, { IUser } from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const generateAccessToken = (userId: any): string => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: any): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  const refreshTokenOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  user.password = undefined;

  res
    .status(statusCode)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json({
      success: true,
      user,
    });
};

export const register = async (req: AuthRequest, res: Response) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  sendTokenResponse(user, 200, res);
};

export const logout = async (req: AuthRequest, res: Response) => {
  res.cookie("accessToken", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });
  res.cookie("refreshToken", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const refreshTokenController = async (
  req: AuthRequest,
  res: Response,
) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new AppError("No refresh token provided.", 401);
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError("Invalid or expired refresh token.", 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError("User not found.", 401);
  }

  const newAccessToken = generateAccessToken(user._id);

  const accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, accessTokenOptions)
    .json({
      success: true,
      message: "Token refreshed successfully",
    });
};
