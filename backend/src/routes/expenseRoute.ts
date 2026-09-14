import express from "express";
import {
  getAllExpenses,
  deleteExpense,
  createExpense,
  getExpensesByCategory,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { expenseSchema } from "../validations/expense.validation.js";

const expenseRouter = express.Router();

expenseRouter.use(protect);

expenseRouter.get("/", getAllExpenses);
expenseRouter.get("/category/:category", getExpensesByCategory);
expenseRouter.post("/", validate(expenseSchema), createExpense);
expenseRouter.delete("/:id", deleteExpense);
expenseRouter.patch("/:id", updateExpense);

export default expenseRouter;
