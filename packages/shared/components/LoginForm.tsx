"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, HSFormInput, Spinner } from "@home-service/ui";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string | null;
  defaultValues?: Partial<LoginFormData>;
  title?: string;
  subtitle?: string;
  showRememberMe?: boolean;
}

export function LoginForm({
  onSubmit,
  loading = false,
  error = null,
  defaultValues = {
    email: "",
    password: "",
    rememberMe: false,
  },
  title = "Welcome back",
  subtitle = "Please sign in to your account",
  showRememberMe = true,
}: LoginFormProps) {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
          <div className="px-8 py-10">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Input */}
                <HSFormInput
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={loading}
                  leftIcon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  }
                />

                {/* Password Input */}
                <HSFormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  leftIcon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                />

                {/* Remember Me & Forgot Password */}
                {showRememberMe && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner size="sm" className="mr-2" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </FormProvider>
          </div>

          {/* Footer */}
          <div className="rounded-b-2xl bg-gray-50 px-8 py-4">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
