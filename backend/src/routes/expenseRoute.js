import express from "express"
import { getAllExpenses, deleteExpense, createExpense, getExpensesByCategory } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.get("/", getAllExpenses);
expenseRouter.get("/category/:category", getExpensesByCategory)
expenseRouter.post("/", createExpense)
expenseRouter.delete("/:id", deleteExpense)

export default expenseRouter