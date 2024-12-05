// Armazenar os produtos (de forma inicial, após carregar do backend)
let produtos = [];

// Referências aos elementos da interface
const formProduto = document.getElementById("form-produto");
const buscarInput = document.getElementById("buscar-nome");
const btnBuscar = document.getElementById("btn-buscar");
const listaProdutos = document.getElementById("produtos-lista");

// Função para carregar os produtos do servidor
async function carregarProdutos() {
    try {
        const response = await fetch('/api/produtos');
        produtos = await response.json();
        renderizarProdutos(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para adicionar um produto ao servidor
async function adicionarProduto(nome, preco, imagem) {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('imagem', imagem);

    try {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            body: formData
        });
        const novoProduto = await response.json();
        produtos.push(novoProduto);
        renderizarProdutos(produtos);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

// Adiciona um produto ao catálogo
formProduto.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que o formulário faça uma submissão padrão

    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const imagem = document.getElementById("imagem").files[0]; // Arquivo de imagem

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!nome || isNaN(preco) || !imagem) {
        alert("Todos os campos devem ser preenchidos corretamente!");
        return;
    }

    adicionarProduto(nome, preco, imagem); // Enviar o produto para o servidor

    // Limpando os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("imagem").value = "";
});

// Renderiza a lista de produtos
function renderizarProdutos(lista) {
    listaProdutos.innerHTML = "";

    lista.forEach((produto) => {
        const produtoItem = document.createElement("div");
        produtoItem.classList.add("produto-item");
        produtoItem.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="/uploads/${produto.imagem}" class="produto-imagem" alt="${produto.nome}">
            <p><strong>Preço:</strong> R$${produto.preco.toFixed(2)}</p>
        `;
        listaProdutos.appendChild(produtoItem);
    });
}

// Iniciar carregamento dos produtos quando a página carregar
window.addEventListener('DOMContentLoaded', carregarProdutos);
