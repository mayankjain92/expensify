'use client';

import { Edit3, Trash2, Loader2, FolderOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expense } from '@/types';

interface ExpenseListProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  onStartEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  loading,
  error,
  onStartEdit,
  onDelete,
}: ExpenseListProps) {
  if (loading) {
    return (
      <Card className="p-12 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-white mx-auto mb-3" />
        <p className="text-zinc-400 text-xs font-medium">Loading expenses...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-900/40 p-12 text-center">
        <p className="text-red-400 font-semibold mb-1 text-sm">Failed to load data</p>
        <p className="text-zinc-500 text-xs">{error}</p>
      </Card>
    );
  }

  if (expenses.length === 0) {
    return (
      <Card className="p-12 text-center">
        <FolderOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-300 font-medium text-sm mb-1">No expenses found</p>
        <p className="text-zinc-500 text-xs">Add your first expense using the form to get started.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {expenses.map((item) => (
              <tr key={item._id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-950 text-zinc-300 border border-zinc-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-400 text-[11px] font-mono">
                  {new Date(item.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 font-semibold text-white font-mono">
                  Rs. {Number(item.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStartEdit(item)}
                    className="h-8 px-2.5 text-[11px]"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1 text-zinc-400" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(item._id)}
                    className="h-8 px-2.5 text-[11px]"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
