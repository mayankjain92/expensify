import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import Expense from "../models/expense.model.js";
const getAllExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await Expense.find({ user: req.user?._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: "All Expenses fetched successfully",
      data: expenses,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while fetching expenses",
      error: err.message,
    });
  }
};

const getExpensesByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
        error: "Category is required",
      });
    }
    const expenses = await Expense.find({
      category: category,
      user: req.user?._id,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      success: true,
      message: "Expenses fetched successfully by category",
      data: expenses,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching expenses by category",
      error: error.message,
    });
  }
};

const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, amount, and category are required",
        error: "Title, amount, and category are required",
      });
    }
    const expenseData = {
      title,
      amount,
      category,
      user: req.user?._id,
      date: date || undefined,
    };
    if (date) expenseData.date = date;

    const expense = await Expense.create(expenseData);
    return res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating expense",
      error: error.message,
    });
  }
};

const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Expense id is required",
        error: "Expense id is required",
      });
    }
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user?._id,
    });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
        error: "Expense not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting expense",
      error: error.message,
    });
  }
};

const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Expense id is required",
        error: "Expense id is required",
      });
    }

    if (!title && !amount && !category && !date) {
      return res.status(400).json({
        success: false,
        message: "One field is needed",
        error: "One field is needed",
      });
    }

    // const expense = await Expense.findByIdAndUpdate()
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
    if (expense) {
      return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: expense,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Expense not found",
      error: "Expense not found",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while updating expense",
      error: error.message,
    });
  }
};

export {
  getAllExpenses,
  getExpensesByCategory,
  createExpense,
  deleteExpense,
  updateExpense,
};
