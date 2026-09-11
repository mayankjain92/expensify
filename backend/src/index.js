import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRouter from "./routes/expenseRoute.js";
import authRouter from "./routes/authRouter.js";
import dbconnect from "./configs/db.js";
import cookieParser from "cookie-parser";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

dbconnect();

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
