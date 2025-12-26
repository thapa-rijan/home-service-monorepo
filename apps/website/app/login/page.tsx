"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, type LoginFormData } from "@shared";

export default function WebsiteLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual login logic here
      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Login data:", data);

      // Redirect to home page after successful login
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      title="Welcome to Home Service"
      subtitle="Sign in to book services"
    />
  );
}
