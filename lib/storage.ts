export type RegistroTriagem = {
  id: string;
  dataISO: string;
  sistema: string;
  risco: "verde" | "amarelo" | "vermelho";
};

const KEY = "triagem_historico_v1";

export function getHistorico(): RegistroTriagem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as RegistroTriagem[]) : [];
  } catch {
    return [];
  }
}

export function addHistorico(item: RegistroTriagem) {
  if (typeof window === "undefined") return;
  const atual = getHistorico();
  atual.unshift(item);
  localStorage.setItem(KEY, JSON.stringify(atual.slice(0, 200)));
}

export function clearHistorico() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
