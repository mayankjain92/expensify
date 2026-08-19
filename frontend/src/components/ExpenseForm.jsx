'use client';

import { PlusCircle, CheckCircle, X, Tag, Calendar, DollarSign, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ExpenseForm({ formData, setFormData, onSubmit, editingId, onCancelEdit }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          {editingId ? (
            <>
              <CheckCircle className="w-4 h-4 text-amber-400" />
              Edit Expense
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 text-white" />
              Add Expense
            </>
          )}
        </CardTitle>
        {editingId && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancelEdit}
            className="h-7 px-2 text-xs text-zinc-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
              <FileText className="w-3 h-3" />
              Title
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Weekly Groceries"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
              <DollarSign className="w-3 h-3" />
              Amount (Rs.)
            </label>
            <Input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="font-mono"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
              <Tag className="w-3 h-3" />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-400 transition-colors"
            >
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
              <Calendar className="w-3 h-3" />
              Date (Optional)
            </label>
            <Input
              type="date"
              value={formData.date ? formData.date.split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            {editingId ? 'Update Expense' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
