import Expense from "../models/expense.model.js";
const getAllExpenses = async (req, res) => {
    try{
        const expenses = await Expense.find().sort({ createdAt: -1 });
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
        const expenses = await Expense.find({category: category}).sort({ createdAt: -1 });
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
        if(!title || !amount || !category){
            return res.status(400).json({
                success: false,
                message: "Title, amount, and category are required",
                error: "Title, amount, and category are required"
            })
        }
        const expenseData = { title, amount, category };
        if (date) expenseData.date = date;

        const expense = await Expense.create(expenseData);
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

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Expense id is required",
                error: "Expense id is required"
            })
        }
        const expense = await Expense.findByIdAndDelete(id)
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found",
                error: "Expense not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error while deleting expense",
            error: error.message
        })
    }
}

export {
    getAllExpenses,
    getExpensesByCategory,
    createExpense,
    deleteExpense
}