'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/expenses';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(err);
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
      const response = await axios.post(API_BASE_URL, formData);
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: '',
      });
      setExpenses(prev => [response.data.data, ...prev]);
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      if(response.status === 200){
        setExpenses(prev => prev.filter(item => item._id !== id))
      }
    } catch (err) {
      console.error('Error deleting expense:', err);
    }finally{
      setLoading(false);
    }
  };

  const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Expensify Tracker
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Personal Expense Manager (Next.js + Express + MongoDB)
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 text-sm font-medium">Total Spent:</span>
            <span className="text-2xl font-bold text-emerald-400">Rs.{totalAmount.toFixed(2)}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              ➕ Add New Expense
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Groceries"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Amount (Rs.)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-98"
              >
                Add Expense
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-slate-200">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase font-medium">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {loading ? (
                <div className="p-12 text-center text-slate-500 animate-pulse">Loading expenses...</div>
              ) : error ? (
                <div className="p-12 text-center text-rose-400 font-medium">{error}</div>
              ) : expenses.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No expenses found. Add your first expense above!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-3.5">Title</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Date</th>
                        <th className="px-6 py-3.5">Amount</th>
                        <th className="px-6 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {expenses.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-100">{item.title}</td>
                          <td className="px-6 py-4">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-md">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-xs">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-semibold text-emerald-400">
                            Rs.{Number(item.amount).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}