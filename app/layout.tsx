import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SafeGmail.com",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black w-full">
          <Header />
          <main className="flex-auto w-full px-4 py-4 mx-auto sm:px-6 md:py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
