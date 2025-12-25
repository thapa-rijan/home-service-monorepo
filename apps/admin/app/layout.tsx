import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata: Metadata = {
  title: "Home Service - Admin",
  description: "Home service application admin panel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
