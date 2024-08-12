import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <head>
        <link rel="icon" href="/img/icons/icono.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
