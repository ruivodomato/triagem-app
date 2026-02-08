"use client";

import { useRouter } from "next/navigation";
import ScreenContainer from "@/components/ScreenContainer";
import { Title, Card } from "@/components/ui";

const sistemas = [
  { id: "respiratorio", nome: "🫁 Respiratório" },
  { id: "gastrointestinal", nome: "🍽️ Gastrointestinal" },
  { id: "cardiovascular", nome: "❤️ Cardiovascular" },
  { id: "neurologico", nome: "🧠 Neurológico" },
  { id: "urinario", nome: "🚽 Urinário" },
  { id: "musculoesqueletico", nome: "🦴 Musculoesquelético" },
  { id: "ginecologico", nome: "🤰 Ginecológico" },
  { id: "pediatrico", nome: "🧒 Pediátrico" },
];

export default function SistemasPage() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Title text="Escolha o sistema" />
      <p style={{ opacity: 0.75 }}>Toque no sistema para iniciar a triagem.</p>

      {sistemas.map((s) => (
        <Card
          key={s.id}
          title={s.nome}
          subtitle="Iniciar avaliação"
          onClick={() => router.push(`/triagem/${s.id}`)}
        />
      ))}
    </ScreenContainer>
  );
}
