import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";
import { Footer } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ServiClick - Todas las soluciones en la palma de tu mano",
  description: "ServiClick - Todas las soluciones en la palma de tu mano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " text-font-color"}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
