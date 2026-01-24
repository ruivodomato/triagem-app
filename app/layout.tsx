import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Triagem - Guia de Bolso",
  description: "Aplicação de triagem em saúde",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
