// ===========================================================================
// ARA0062 — comportamento da página
// Este arquivo começa vazio de propósito: o JavaScript entra no ciclo 6.
// Ele já está ligado ao index.html pela linha
// <script src="js/script.js" defer></script>
// ===========================================================================
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
