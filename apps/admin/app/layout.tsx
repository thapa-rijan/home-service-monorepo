import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ReduxProvider from "@/components/providers/redux-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Home Service - Admin",
  description: "Home service application admin panel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
