import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perryland",
  description: "Perryland",
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
      <body className={inter.className + " text-font font-medium"}>
        <Header
          links={[
            {name: 'Asistencias', to: '#about'},
            {name: 'Ubicación', to: '#about'},
            {name: 'Contacto', to: '#contact'},
          ]}
        />
        {children}
        <Footer/>
      </body>
    </html>
  );
}