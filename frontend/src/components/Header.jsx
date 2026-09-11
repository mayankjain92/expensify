'use client';

import { Wallet, TrendingUp, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';


export default function Header({ totalAmount }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-zinc-800/80 gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shadow-sm">
            <Wallet className="w-4 h-4 text-zinc-200" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Expensify
          </h1>
        </div>
        <p className="text-zinc-400 text-xs sm:text-sm font-normal">
          Personal Expense Manager (Next.js + Express + MongoDB)
        </p>
      </div>

      <Card className="w-full sm:w-auto p-4 py-3 flex items-center justify-between sm:justify-start gap-5">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Total Spent</span>
          <span className="text-2xl font-bold text-white font-mono tracking-tight">
            Rs. {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <TrendingUp className="w-4 h-4 text-zinc-300" />
        </div>
      </Card>
      {user && (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex flex-col items-end px-2">
              <span className="text-xs font-semibold text-white capitalize">{user.username}</span>
              <span className="text-[10px] text-zinc-500">{user.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 hover:border-red-900/50"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
    </header>
  );
}
