import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import Expense from "../models/expense.model.js";
import { AppError } from "../utils/AppError.js";

const getAllExpenses = async (req: AuthRequest, res: Response) => {
  const expenses = await Expense.find({ user: req.user?._id }).sort({
    createdAt: -1,
  });
  return res.status(200).json({
    success: true,
    message: "All Expenses fetched successfully",
    data: expenses,
  });
};

const getExpensesByCategory = async (req: AuthRequest, res: Response) => {
  const { category } = req.params;
  if (!category) {
    throw new AppError("Category is required", 400);
  }

  const expenses = await Expense.find({
    category,
    user: req.user?._id,
  }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    message: "Expenses fetched successfully by category",
    data: expenses,
  });
};

const createExpense = async (req: AuthRequest, res: Response) => {
  const { title, amount, category, date } = req.body;

  const expense = await Expense.create({
    title,
    amount,
    category,
    user: req.user?._id,
    date: date || undefined,
  });

  return res.status(201).json({
    success: true,
    message: "Expense created successfully",
    data: expense,
  });
};

const deleteExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("Expense id is required", 400);
  }

  const expense = await Expense.findOneAndDelete({
    _id: id,
    user: req.user?._id,
  });

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
};

const updateExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;

  if (!id) {
    throw new AppError("Expense id is required", 400);
  }

  if (!title && !amount && !category && !date) {
    throw new AppError("At least one field is needed to update", 400);
  }

  const expense = await Expense.findOneAndUpdate(
    { _id: id, user: req.user?._id },
    {
      title,
      amount,
      category,
      date,
    },
    { new: true },
  );

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Expense updated successfully",
    data: expense,
  });
};

export {
  getAllExpenses,
  getExpensesByCategory,
  createExpense,
  deleteExpense,
  updateExpense,
};
