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
const produtos = [
  { id: 1, nome: "Pão francês", categoria: "Pães", descricao: "Crocante por fora, macio por dentro.", preco: 0.9 },
  { id: 2, nome: "Pão de queijo", categoria: "Pães", descricao: "Receita mineira, assado na hora.", preco: 3.5 },
  { id: 3, nome: "Pão de forma", categoria: "Pães", descricao: "Fatiado, ideal para o café da manhã.", preco: 9.9 },
  { id: 4, nome: "Sonho de creme", categoria: "Doces", descricao: "Recheio cremoso de baunilha.", preco: 6.5 },
  { id: 5, nome: "Bolo de cenoura", categoria: "Doces", descricao: "Com cobertura de chocolate.", preco: 5.0 },
  { id: 6, nome: "Coxinha", categoria: "Salgados", descricao: "Frango com catupiry.", preco: 7.0 },
  { id: 7, nome: "Esfiha de carne", categoria: "Salgados", descricao: "Assada, com massa leve.", preco: 6.0 },
  { id: 8, nome: "Café coado", categoria: "Bebidas", descricao: "Passado a cada hora.", preco: 4.0 },
  { id: 9, nome: "Suco de laranja", categoria: "Bebidas", descricao: "Natural, 300 ml.", preco: 8.0 }
];
const listaProdutos = document.getElementById("produtos");
const areaFiltros = document.getElementById("filtros");
const campoBusca = document.getElementById("busca");
const semResultado = document.getElementById("sem-resultado");
const categorias = ["Todos", ...new Set(produtos.map(p => p.categoria))];
let categoriaAtual = "Todos";

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function mostrarProdutos() {
  const termo = normalizar(campoBusca.value.trim());
  const filtrados = produtos.filter(p =>
    (categoriaAtual === "Todos" || p.categoria === categoriaAtual) &&
    normalizar(p.nome + " " + p.descricao).includes(termo)
  );
