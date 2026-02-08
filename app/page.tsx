"use client";

import { useRouter } from "next/navigation";
import ScreenContainer from "@/components/ScreenContainer";
import { Title, ButtonPrimary, Card } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Title text="Triagem – Seu Guia de Bolso" />
      <p style={{ opacity: 0.75 }}>
        Responda algumas perguntas e receba orientações iniciais de saúde.
      </p>

      <ButtonPrimary text="Iniciar Triagem" onClick={() => router.push("/sistemas")} />

      <Card title="📜 Histórico" subtitle="Veja triagens anteriores" onClick={() => router.push("/historico")} />
      <Card title="ℹ️ Sobre" subtitle="Avisos e informações do app" onClick={() => router.push("/sobre")} />
    </ScreenContainer>
  );
}
