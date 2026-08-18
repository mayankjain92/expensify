import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRouter from "./routes/expenseRoute.js";
import dbconnect from "./configs/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dbconnect();

app.use("/api/expenses", expenseRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})