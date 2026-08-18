import Expense from "../models/expense.model.js";
const getAllExpenses = async (req, res) => {
    try{
        const expenses = await Expense.find();
        return res.status(200).json({
            success: true,
            message: "All Expenses fetched successfully",
            data: expenses
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error while fetching expenses",
            error: err.message
        })
        
    }
}

const getExpensesByCategory = async(req, res) => {
    try {
        const category = req.params.category;
        if(!category){
            return res.status(400).json({
                success: false,
                message: "Category is required",
                error: "Category is required"
            })
        }
        const expenses = await Expense.find({category: category});
        return res.status(200).json({
            success: true,
            message: "Expenses fetched successfully by category",
            data: expenses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while fetching expenses by category",
            error: error.message
        })
    }
}

const createExpense = async(req, res) => {
    try {
        const {
            title,
            amount,
            category,
            date,
        } = req.body;
        if(!title || !amount || !category || date){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                error: "All fields are required"
            })
        }
        const expense = Expense.create({
            title: title,
            amount: amount,
            category: category,
            date: date,
        })
        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while creating expense",
            error: error.message
        })
    }
}