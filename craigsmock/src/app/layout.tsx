import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ray's List",
  description: "Why rely on Craig, when Ray is here?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
