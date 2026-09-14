"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register(username, email, password);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <Card className="w-full max-w-md p-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-white">
            Sign Up to Expensify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase">
                Username
              </label>
              <Input
                type="text"
                required
                placeholder="john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase">
                Email
              </label>
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase">
                Password
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>

            <p className="text-center text-xs text-zinc-400 pt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
