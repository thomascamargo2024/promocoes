// Atualiza o endereço pelo CEP via API
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function buscarEndereco(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        document.getElementById('enderecoCompleto').textContent = 'Endereço não encontrado';
        return;
      }

      const endereco = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
      const enderecoSpan = document.getElementById('enderecoCompleto');
      enderecoSpan.textContent = endereco;
      enderecoSpan.classList.add('endereco-centralizado');

      // Esconde input
      document.getElementById('inputEndereco').style.display = 'none';
    })
    .catch(() => {
      document.getElementById('enderecoCompleto').textContent = 'Erro ao buscar endereço';
    });
}

function enviarCep() {
  const cep = document.getElementById('cepInput').value.trim();
  if (cep) {
    buscarEndereco(cep);
  } else {
    alert("Por favor, digite um CEP válido.");
  }
}

// Permitir Enter
document.getElementById("cepInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarCep();
  }
});

const cep = getQueryParam('cep');
if (cep) {
  buscarEndereco(cep);
} else {
  document.getElementById('enderecoCompleto').textContent = 'Digite seu CEP';
}

// -----------------------------
// Ver mais: mostrar produtos
// -----------------------------
const produtosContainer = document.getElementById('produtosContainer');
const verMaisBtn = document.getElementById('verMais');

const todosOsProdutos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  nome: `Produto ${i + 1}`
}));

let produtosVisiveis = 0;
const quantidadePorClique = 4;

function renderizarProdutos() {
  const novosProdutos = todosOsProdutos.slice(
    produtosVisiveis,
    produtosVisiveis + quantidadePorClique
  );

  novosProdutos.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.textContent = produto.nome;
    produtosContainer.appendChild(div);
  });

  produtosVisiveis += novosProdutos.length;

  if (produtosVisiveis >= todosOsProdutos.length) {
    verMaisBtn.style.display = 'none';
  }
}

renderizarProdutos();
verMaisBtn.addEventListener('click', renderizarProdutos);
