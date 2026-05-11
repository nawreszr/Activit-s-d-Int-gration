import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduManager | Nexus of Knowledge",
  description: "Experience the next generation of academic management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full dark">
      <body className={`${outfit.className} h-full bg-zinc-950 text-slate-200 antialiased selection:bg-primary/30`}>
        <div className="bg-mesh" />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:pl-72 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12 lg:py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
