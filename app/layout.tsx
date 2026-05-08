import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import InfinityBadge from "@/components/sections/InfinityBadge";

export const metadata: Metadata = {
  title: "AECMI - Certificación de Competencias BIM",
  description:
    "AECMI es una organización internacional especializada en la certificación de competencias BIM para profesionales del sector AEC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-pmi-cream antialiased">
        <Header />
        {children}
        <Footer />
        <InfinityBadge />
      </body>
    </html>
  );
}
