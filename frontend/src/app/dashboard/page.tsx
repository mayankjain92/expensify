"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Header from "@/components/Header";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseFilter from "@/components/ExpenseFilter";
import ExpenseList from "@/components/ExpenseList";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Expense, ExpenseFormData } from "@/types";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);
      let url = "/expenses";
      try {
        if (selectedCategory !== "All") {
          url = `/expenses/category/${selectedCategory}`;
        }
        const response = await api.get(url);
        if (response.data.success) {
          setExpenses(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch expenses");
        }
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [user, selectedCategory]);

  if (authLoading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE existing expense
        const response = await api.patch(`/expenses/${editingId}`, formData);
        if (response.data.success) {
          setExpenses((prev) =>
            prev.map((item) =>
              item._id === editingId ? response.data.data : item,
            ),
          );
        }
        setEditingId(null);
      } else {
        // CREATE new expense
        const response = await api.post("/expenses", formData);
        if (response.data.success) {
          setExpenses((prev) => [response.data.data, ...prev]);
        }
      }

      // Reset Form
      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: "",
      });
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  };

  const handleStartEdit = (expense: Expense) => {
    setEditingId(expense._id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date ? expense.date.split("T")[0] : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: "",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/expenses/${id}`);
      if (response.data.success) {
        setExpenses((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const totalAmount = expenses.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-zinc-800 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <Header totalAmount={totalAmount} />

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <ExpenseForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              editingId={editingId}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Transaction Area */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <ExpenseList
              expenses={expenses}
              loading={loading}
              error={error}
              onStartEdit={handleStartEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
