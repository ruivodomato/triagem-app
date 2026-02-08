export type RegistroTriagem = {
  sistema: string;
  risco: "verde" | "amarelo" | "vermelho";
  data: string;
};

const CHAVE = "historico_triagem";

export function salvarRegistro(registro: RegistroTriagem) {
  const atual = buscarHistorico();
  atual.push(registro);
  localStorage.setItem(CHAVE, JSON.stringify(atual));
}

export function buscarHistorico(): RegistroTriagem[] {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem(CHAVE);
  return dados ? JSON.parse(dados) : [];
}
