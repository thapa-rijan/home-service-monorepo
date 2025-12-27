"use client";

import {
  useAppDispatch,
  useAppSelector,
  loginRequest,
} from "@home-service/lib";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm, type LoginFormData } from "@shared";
import { toast } from "sonner";

export default function LoginClient() {
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginRequest(data));
  };

  return (
    <>
      <LoginForm
        onSubmit={onSubmit}
        loading={loading}
        defaultValues={{
          email: "rijan4568@gmail.com",
          password: "11111111",
        }}
        title="Admin Dashboard"
        subtitle="Sign in to access the admin panel"
      />
    </>
  );
}
