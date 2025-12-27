import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";

export default function Page() {
  const token = cookies().get("accessToken")?.value;
  if (token) {
    // If token exists on server render, immediately redirect to dashboard
    redirect("/");
  }

  return <LoginClient />;
}
