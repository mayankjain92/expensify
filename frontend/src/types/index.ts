export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseFormData {
  title: string;
  amount: string | number;
  category: string;
  date: string;
}
