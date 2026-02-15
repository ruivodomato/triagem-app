"use client";

import { useParams, useRouter } from "next/navigation";
import ScreenContainer from "@/components/ScreenContainer";
import { Title } from "@/components/ui";

const nomes: Record<string, string> = {
  respiratorio: "🫁 Respiratório",
  gastrointestinal: "🍽️ Gastrointestinal",
  cardiovascular: "❤️ Cardiovascular",
  neurologico: "🧠 Neurológico",
  urinario: "🚽 Urinário",
  musculoesqueletico: "🦴 Musculoesquelético",
  ginecologico: "🤰 Ginecológico",
  pediatrico: "🧒 Pediátrico",
};

export default function TriagemSistemaPage() {
  const params = useParams<{ sistema: string }>();
  const router = useRouter();

  const sistema = params?.sistema || "";
  const nome = nomes[sistema] ?? sistema;

  // Se for respiratório, deixa o Next renderizar a página real
  if (sistema === "respiratorio") {
    return null;
  }

  return (
    <ScreenContainer>
      <Title text={`Triagem – ${nome}`} />
      <p style={{ opacity: 0.75 }}>
        Esse sistema ainda está em construção. Em breve você poderá fazer a triagem completa aqui.
      </p>

      <button
        onClick={() => router.push("/sistemas")}
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 12,
          border: "1px solid #d1d5db",
          background: "#fff",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
    </ScreenContainer>
  );
}
