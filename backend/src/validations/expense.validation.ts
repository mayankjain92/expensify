import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  amount: z.number().positive("Amount must be greater than zero."),
  category: z.enum([
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Other",
  ]),
  date: z.string().optional(),
});

export const updateExpenseSchema = expenseSchema.partial();

export type ExpenseInput = z.infer<typeof expenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
