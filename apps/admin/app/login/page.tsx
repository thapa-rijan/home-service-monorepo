"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequest } from "@/redux/actions/auth.actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, type LoginFormData } from "@shared";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginRequest(data));
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      defaultValues={{
        email: "rijan4568@gmail.com",
        password: "11111111",
      }}
      title="Admin Dashboard"
      subtitle="Sign in to access the admin panel"
    />
  );
}
