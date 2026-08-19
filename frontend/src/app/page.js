'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseFilter from '@/components/ExpenseFilter';
import ExpenseList from '@/components/ExpenseList';

const API_BASE_URL = 'http://localhost:5000/api/expenses';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = API_BASE_URL;
        if (selectedCategory !== 'All') {
          url = `${API_BASE_URL}/category/${selectedCategory}`;
        }
        const response = await axios.get(url);
        if (response.data.success) {
          setExpenses(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch expenses');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE existing expense
        const response = await axios.patch(`${API_BASE_URL}/${editingId}`, formData);
        if (response.data.success) {
          setExpenses((prev) =>
            prev.map((item) => (item._id === editingId ? response.data.data : item))
          );
        }
        setEditingId(null);
      } else {
        // CREATE new expense
        const response = await axios.post(API_BASE_URL, formData);
        if (response.data.success) {
          setExpenses((prev) => [response.data.data, ...prev]);
        }
      }

      // Reset Form
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: '',
      });
    } catch (err) {
      console.error('Error submitting expense:', err);
    }
  };

  const handleStartEdit = (expense) => {
    setEditingId(expense._id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date ? expense.date.split('T')[0] : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if (response.status === 200) {
        setExpenses((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);

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