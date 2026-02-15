"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ScreenContainer from "@/components/ScreenContainer";
import { salvarRegistroTriagem, type NivelRisco } from "@/lib/historico";

type Pergunta = {
  id: string;
  titulo: string;
  descricao?: string;
  pesoSim: number; // pontuação se responder "Sim"
};

const PERGUNTAS: Pergunta[] = [
  {
    id: "falta_ar_reposo",
    titulo: "Falta de ar em repouso?",
    descricao: "Mesmo parada(o), sente dificuldade para respirar ou precisa fazer força para puxar o ar.",
    pesoSim: 5,
  },
  {
    id: "cianose_palidez",
    titulo: "Lábios/rosto arroxeados ou muito pálidos?",
    descricao: "Sinal de baixa oxigenação.",
    pesoSim: 5,
  },
  {
    id: "dor_peito_forte",
    titulo: "Dor no peito forte ou aperto?",
    descricao: "Especialmente se piora ao respirar ou vem com falta de ar/suor frio.",
    pesoSim: 4,
  },
  {
    id: "chiado_intenso",
    titulo: "Chiado no peito intenso ou piorando?",
    descricao: "Chiado acompanhado de dificuldade para falar frases completas.",
    pesoSim: 3,
  },
  {
    id: "febre_alta_persistente",
    titulo: "Febre alta (≥ 39°C) ou febre persistente?",
    descricao: "Por mais de 3 dias ou associada a piora respiratória.",
    pesoSim: 2,
  },
];

function calcularRisco(score: number): NivelRisco {
  if (score >= 8) return "vermelho";
  if (score >= 4) return "amarelo";
  return "verde";
}

function textoRisco(risco: NivelRisco) {
  if (risco === "vermelho") return { titulo: "Risco Alto", subtitulo: "Procure atendimento imediato." };
  if (risco === "amarelo") return { titulo: "Risco Moderado", subtitulo: "Atenção e reavaliação." };
  return { titulo: "Risco Baixo", subtitulo: "Cuidados e observação." };
}

function corRisco(risco: NivelRisco) {
  if (risco === "vermelho") return { bg: "#ffebee", border: "#f44336" };
  if (risco === "amarelo") return { bg: "#fff8e1", border: "#ff9800" };
  return { bg: "#e8f5e9", border: "#4caf50" };
}

export default function TriagemRespiratoriaPage() {
  const [respostas, setRespostas] = useState<Record<string, boolean | null>>(() => {
    const base: Record<string, boolean | null> = {};
    for (const p of PERGUNTAS) base[p.id] = null;
    return base;
  });

  const [resultado, setResultado] = useState<{ score: number; risco: NivelRisco } | null>(null);
  const jaSalvouRef = useRef(false);

  const score = useMemo(() => {
    let s = 0;
    for (const p of PERGUNTAS) {
      const r = respostas[p.id];
      if (r === true) s += p.pesoSim;
    }
    return s;
  }, [respostas]);

  const respondeuTudo = useMemo(() => {
    return PERGUNTAS.every((p) => respostas[p.id] !== null);
  }, [respostas]);

  // Resultado AUTOMÁTICO assim que terminar
  useEffect(() => {
    if (!respondeuTudo) {
      setResultado(null);
      jaSalvouRef.current = false;
      return;
    }

    const risco = calcularRisco(score);
    const novo = { score, risco };
    setResultado(novo);

    // Salvar histórico UMA vez
    if (!jaSalvouRef.current) {
      jaSalvouRef.current = true;

      const respostasFinal: Record<string, boolean> = {};
      for (const p of PERGUNTAS) respostasFinal[p.id] = Boolean(respostas[p.id]);

      salvarRegistroTriagem({
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        createdAt: new Date().toISOString(),
        sistema: "Respiratório",
        score,
        risco,
        respostas: respostasFinal,
      });
    }
  }, [respondeuTudo, respostas, score]);

  function responder(id: string, valor: boolean) {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
  }

  function reiniciar() {
    const base: Record<string, boolean | null> = {};
    for (const p of PERGUNTAS) base[p.id] = null;
    setRespostas(base);
    setResultado(null);
    jaSalvouRef.current = false;
  }

  return (
    <ScreenContainer>
      <h1 style={{ textAlign: "center", margin: "12px 0 18px" }}>Triagem Respiratória</h1>

      {!resultado && (
        <div style={{ display: "grid", gap: 12 }}>
          {PERGUNTAS.map((p, idx) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {idx + 1}. {p.titulo}
              </div>
              {p.descricao && <div style={{ marginTop: 6, color: "#444" }}>{p.descricao}</div>}

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button
                  onClick={() => responder(p.id, true)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #d1d5db",
                    background: respostas[p.id] === true ? "#111827" : "#fff",
                    color: respostas[p.id] === true ? "#fff" : "#111827",
                    fontWeight: 700,
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  Sim
                </button>
                <button
                  onClick={() => responder(p.id, false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid #d1d5db",
                    background: respostas[p.id] === false ? "#111827" : "#fff",
                    color: respostas[p.id] === false ? "#fff" : "#111827",
                    fontWeight: 700,
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 6, fontSize: 13, color: "#6b7280", textAlign: "center" }}>
            Ao responder a última pergunta, o resultado aparece automaticamente.
          </div>
        </div>
      )}

      {resultado && (
        <ResultadoFinal
          score={resultado.score}
          risco={resultado.risco}
          onReiniciar={reiniciar}
        />
      )}
    </ScreenContainer>
  );
}

function ResultadoFinal({
  score,
  risco,
  onReiniciar,
}: {
  score: number;
  risco: NivelRisco;
  onReiniciar: () => void;
}) {
  const t = textoRisco(risco);
  const c = corRisco(risco);

  const orientacoes = {
    verde: [
      "Hidrate-se (água em pequenos goles ao longo do dia).",
      "Evite fumaça, poeira e cheiros fortes.",
      "Repouse e observe a evolução nas próximas 24–48h.",
      "Se aparecer febre alta, piora da falta de ar ou dor no peito, refaça a triagem.",
    ],
    amarelo: [
      "Monitore sintomas (piora da falta de ar, febre persistente, dor no peito).",
      "Procure avaliação médica se não melhorar em 24h ou se houver piora.",
      "Evite esforço físico e mantenha hidratação.",
      "Se surgir lábios arroxeados, confusão, ou falta de ar em repouso → emergência.",
    ],
    vermelho: [
      "Procure atendimento imediatamente (UPA/Pronto Socorro).",
      "Se possível, vá acompanhado(a).",
      "Se houver piora rápida, sensação de desmaio, lábios arroxeados → emergência agora.",
      "Enquanto aguarda ajuda, mantenha-se sentado(a) e tente respirar lentamente.",
    ],
  }[risco];

  // conforto também para amarelo/vermelho
  const conforto = [
    "Sente-se com o tronco levemente inclinado para frente, apoiando os antebraços nas coxas.",
    "Respiração com lábios semicerrados: inspire pelo nariz 2–3s e solte o ar pela boca 4–6s.",
    "Ambiente arejado, roupas folgadas, evite deitar totalmente se estiver com falta de ar.",
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          background: c.bg,
          border: `2px solid ${c.border}`,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800 }}>{t.titulo}</div>
        <div style={{ marginTop: 4, color: "#111827" }}>{t.subtitulo}</div>
        <div style={{ marginTop: 10, fontSize: 13, color: "#374151" }}>
          Pontuação técnica (invisível no app, útil pra registro): <b>{score}</b>
        </div>
      </div>

      <Card titulo="O que fazer agora">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {orientacoes.map((x) => (
            <li key={x} style={{ marginBottom: 8 }}>
              {x}
            </li>
          ))}
        </ul>
      </Card>

      <Card titulo="Técnicas de conforto (mesmo em amarelo/vermelho)">
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {conforto.map((x) => (
            <li key={x} style={{ marginBottom: 8 }}>
              {x}
            </li>
          ))}
        </ul>
      </Card>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onReiniciar}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            background: "#fff",
            fontWeight: 800,
            flex: 1,
            cursor: "pointer",
          }}
        >
          Refazer triagem
        </button>

        <a
          href="/historico"
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #111827",
            background: "#111827",
            color: "#fff",
            fontWeight: 800,
            textAlign: "center",
            flex: 1,
            textDecoration: "none",
          }}
        >
          Ver histórico
        </a>
      </div>

      <div style={{ fontSize: 12, color: "#6b7280" }}>
        Aviso: este app orienta triagem inicial e não substitui avaliação médica.
      </div>
    </div>
  );
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 14 }}>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>{titulo}</div>
      {children}
    </div>
  );
}
