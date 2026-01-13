"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/server/user";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        `Error: ${
          err instanceof Error ? err.message : "Failed to send reset email"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-accent">
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-accent-foreground mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 bg-green-50 text-green-900">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                If an account exists with that email, we've sent a password
                reset link. Please check your email (or terminal in development
                mode).
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 bg-neutral-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-chart-4 focus:border-chart-4 transition-colors"
                placeholder="Enter your email"
                disabled={isLoading || success}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-chart-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="text-center space-y-2">
            <Link
              href="/auth/sign-in"
              className="text-primary hover:text-chart-4 cursor-pointer text-sm font-medium transition-colors block"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
