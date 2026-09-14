import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import User, { IUser } from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshTokenController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
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
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Failed to refresh token.",
      error: error.message,
    });
  }
};
