// ===========================================================================
// ARA0062 — comportamento da página
// Este arquivo começa vazio de propósito: o JavaScript entra no ciclo 6.
// Ele já está ligado ao index.html pela linha
// <script src="js/script.js" defer></script>
// ===========================================================================
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function lerSalvo(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto === null ? padrao : JSON.parse(texto);
  } catch (e) {
    return padrao;
  }
}
function salvar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* ignora */ }
}