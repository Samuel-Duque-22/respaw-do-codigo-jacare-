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
  listaProdutos.innerHTML = "";
  filtrados.forEach(p => {
    const item = document.createElement("li");
    item.className = "produto";
    item.innerHTML =
      "<h3>" + p.nome + "</h3>" +
      "<p>" + p.descricao + "</p>" +
      '<p class="preco">' + formatarPreco(p.preco) + "</p>" +
      '<button type="button" class="botao botao--pequeno" data-id="' + p.id + '">Adicionar</button>';
    listaProdutos.appendChild(item);
  });
  semResultado.hidden = filtrados.length > 0;
}
categorias.forEach(cat => {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = cat;
  botao.setAttribute("aria-pressed", cat === "Todos");
  botao.addEventListener("click", () => {
    areaFiltros.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", "false"));
    botao.setAttribute("aria-pressed", "true");
    categoriaAtual = cat;
    mostrarProdutos();
  });
  areaFiltros.appendChild(botao);
});
campoBusca.addEventListener("input", mostrarProdutos);
let carrinho = lerSalvo("triguinho-carrinho", {});

const listaCarrinho = document.getElementById("carrinho");
const textoVazio = document.getElementById("carrinho-vazio");
const textoTotal = document.getElementById("total");
const btnPedido = document.getElementById("btn-pedido");
const btnLimpar = document.getElementById("btn-limpar");

function mostrarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  let quantidadeItens = 0;

  produtos.forEach(p => {
    const qtd = carrinho[p.id] || 0;
    if (qtd === 0) return;
    total += qtd * p.preco;
    quantidadeItens += qtd;

    const li = document.createElement("li");
    li.innerHTML =
      '<span class="item__nome">' + p.nome + "</span>" +
      '<span class="item__qtd">' +
        '<button type="button" data-acao="menos" data-id="' + p.id + '" aria-label="Diminuir ' + p.nome + '">−</button>' +
        "<span>" + qtd + "</span>" +
        '<button type="button" data-acao="mais" data-id="' + p.id + '" aria-label="Aumentar ' + p.nome + '">+</button>' +
      "</span>" +
      '<span class="item__sub">' + formatarPreco(qtd * p.preco) + "</span>";
    listaCarrinho.appendChild(li);
  });

  const temItens = quantidadeItens > 0;
  textoVazio.hidden = temItens;
  textoTotal.hidden = !temItens;
  btnPedido.hidden = !temItens;
  btnLimpar.hidden = !temItens;
  textoTotal.textContent = "Total: " + formatarPreco(total);
  salvar("triguinho-carrinho", carrinho);
}

function mudarQuantidade(id, diferenca) {
  const nova = (carrinho[id] || 0) + diferenca;
  if (nova <= 0) { delete carrinho[id]; } else { carrinho[id] = nova; }
  mostrarCarrinho();
}