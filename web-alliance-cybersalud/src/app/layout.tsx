import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MHM Corredora de Seguros",
  description: "MHM Corredora de Seguros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icono.png" />
      </head>
      <body className={inter.className + " text-primary"}>
        <Header
          links={[
            {name: 'Asistencias', to: ''},
            {name: 'Ubicación', to: ''},
            {name: 'Contacto', to: ''},
          ]}
        />
        {children}
      </body>
    </html>
  );
}