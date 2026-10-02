"use client";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import "@/src/admin/styles/admin.css";
import { loginAction } from "./actions";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: "" });

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F7F5FA" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              AI BRICKS
            </h1>
            <p className="text-purple-100 text-sm font-medium">Admin Panel Login</p>
          </div>

          {/* Login Form */}
          <form action={formAction} className="p-8 space-y-6">
            {state.error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                {state.error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  className="admin-input admin-input-with-icon py-3"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  className="admin-input admin-input-with-icon py-3"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full admin-btn-primary py-3.5 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-purple-600 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
