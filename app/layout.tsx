import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Triagem App",
  description: "Aplicação de triagem em saúde",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
