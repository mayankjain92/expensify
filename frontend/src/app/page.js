"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  BarChart3,
  CheckCircle2,
  Lock,
  Sparkles,
  DollarSign,
  Coffee,
  Laptop,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden font-sans">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <nav className="border-b border-zinc-800/80 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-emerald-400/60 transition-all">
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Expensify
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-white transition-colors">
              Live Preview
            </a>
            <a href="#tech" className="hover:text-white transition-colors">
              Architecture
            </a>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                  Dashboard
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center relative">
        {/* Neon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Full-Stack Personal Finance Platform
        </div>

        {/* Neon Tint Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Master Your Wealth With{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(52,211,153,0.45)]">
            Precision & Clarity
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Track expenses in real-time, gain instant visibility into your cash flow, and secure your financial data with enterprise-grade JWT architecture.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02]">
              {user ? "Open Your Dashboard" : "Start Tracking For Free"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={user ? "/dashboard" : "/login"} className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-7 border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white">
              {user ? "View Analytics" : "Sign In to Account"}
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HttpOnly Cookie Auth</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Fast MERN + Next.js</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Per-User Isolated Data</span>
          </div>
        </div>
      </section>

      {/* Live Dashboard Mockup Preview */}
      <section id="preview" className="px-4 sm:px-6 max-w-5xl mx-auto pb-24">
        <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.08)] backdrop-blur-xl">
          {/* Header Bar Mockup */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/40 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Live Workspace Preview</h3>
                <p className="text-[11px] text-zinc-500">Real-time data synchronization</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl px-4 py-2">
              <div>
                <div className="text-[10px] uppercase font-semibold text-zinc-400">Total Spent</div>
                <div className="text-xl font-bold font-mono text-white">Rs. 24,850.00</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Sample Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-zinc-900/40 border-zinc-800/60 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Coffee className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">Café & Dining</div>
                <div className="text-[11px] text-zinc-500">Category: Food</div>
              </div>
              <div className="text-sm font-mono font-bold text-white">Rs. 450</div>
            </Card>

            <Card className="p-4 bg-zinc-900/40 border-zinc-800/60 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Laptop className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">Software License</div>
                <div className="text-[11px] text-zinc-500">Category: Tech</div>
              </div>
              <div className="text-sm font-mono font-bold text-white">Rs. 1,299</div>
            </Card>

            <Card className="p-4 bg-zinc-900/40 border-zinc-800/60 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Plane className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">Weekend Flight</div>
                <div className="text-[11px] text-zinc-500">Category: Travel</div>
              </div>
              <div className="text-sm font-mono font-bold text-white">Rs. 6,800</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 border-t border-zinc-900 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">Engineered For Reliability</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Everything You Need To Control Finances</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Smart Categorization</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Dynamically filter expenses by categories (Food, Travel, Tech, Bills) with real-time aggregated spending totals.
            </p>
          </Card>

          <Card className="p-6 bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Stateless JWT Security</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Zero plain-text secrets in client storage. Uses tamper-proof HttpOnly cookies with CSRF and cross-origin protection.
            </p>
          </Card>

          <Card className="p-6 bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Decoupled REST API</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Express 5 backend backed by MongoDB Mongoose schemas with indexed user queries for sub-millisecond retrieval.
            </p>
          </Card>
        </div>
      </section>

      {/* Tech Stack Highlights (Great for Resume / Interviewers!) */}
      <section id="tech" className="py-16 border-t border-zinc-900 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-xl font-bold text-white">Full-Stack Production Architecture</h3>
          <p className="text-xs text-zinc-500 mt-1">Built using industry-standard engineering practices</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="text-emerald-400 font-bold text-sm">Next.js 16</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">App Router & Client Context</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="text-emerald-400 font-bold text-sm">Express 5</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">RESTful Middleware & API</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="text-emerald-400 font-bold text-sm">MongoDB</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Mongoose ODM & Schemas</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="text-emerald-400 font-bold text-sm">Tailwind CSS</div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Dark Mode & Glassmorphism</div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 sm:p-12 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none" />
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Take Control of Your Spending Today
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Create an account in seconds, start adding your expenses, and see your financial clarity skyrocket.
          </p>
          <Link href={user ? "/dashboard" : "/register"}>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-[0_0_30px_rgba(16,185,129,0.4)] px-8">
              {user ? "Go To Dashboard" : "Create Free Account"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 text-center text-xs text-zinc-500">
        <div className="flex items-center justify-center gap-2 mb-2 text-zinc-400 font-medium">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Expensify</span>
        </div>
        <p>© {new Date().getFullYear()} Expensify. Built with Next.js, Express & MongoDB.</p>
      </footer>
    </div>
  );
}
