import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ReduxProvider from "../components/providers/redux-provider";

export const metadata: Metadata = {
  title: "Home Service - Website",
  description: "Home service application website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
