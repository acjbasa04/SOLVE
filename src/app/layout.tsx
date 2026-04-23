"use client";

import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased selection:bg-emerald-500/30">
        {!isAdmin && <Navbar />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdmin && (
          <footer className="bg-slate-50 border-t border-slate-100 py-12 px-6 text-center text-slate-400 text-sm">
            <p>&copy; 2026 SOLVE Platform. Strengthening Organizational Leadership, Values and Ethics.</p>
          </footer>
        )}
      </body>
    </html>
  );
}
