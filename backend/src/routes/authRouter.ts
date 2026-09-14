import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  refreshTokenController,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, getMe);
authRouter.post("/refresh", refreshTokenController);

export default authRouter;
