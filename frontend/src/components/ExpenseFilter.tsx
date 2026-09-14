'use client';

import { Filter, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ExpenseFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ExpenseFilter({ selectedCategory, onSelectCategory }: ExpenseFilterProps) {
  return (
    <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">Transactions</h3>
          <p className="text-xs text-zinc-500">History of logged expenses</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-[11px] text-zinc-400 uppercase font-medium tracking-wider">Filter:</span>
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 text-xs rounded-xl px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-zinc-400 transition-colors"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </Card>
  );
}
