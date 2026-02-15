import Link from "next/link";
import ScreenContainer from "@/components/ScreenContainer";

export default function Home() {
  return (
    <ScreenContainer>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>
        Triagem – Guia de Bolso
      </h1>

      <div style={{ display: "grid", gap: 10 }}>
        <Link
          href="/triagem/respiratorio"
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #111827",
            background: "#111827",
            color: "#fff",
            fontWeight: 800,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Começar – Respiratório
        </Link>

        <Link
          href="/historico"
          style={{
            padding: 14,
            borderRadius: 14,
            border: "1px solid #d1d5db",
            background: "#fff",
            color: "#111827",
            fontWeight: 800,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Ver histórico
        </Link>
      </div>
    </ScreenContainer>
  );
}
