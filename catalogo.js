const produtosLista = document.getElementById("produtos-lista");

// Função para carregar os produtos da API
function carregarProdutos() {
    fetch('/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            produtosLista.innerHTML = "";
            produtos.forEach(produto => {
                const produtoItem = document.createElement("div");
                produtoItem.classList.add("produto-item");
                produtoItem.innerHTML = `
                    <h3>${produto.nome}</h3>
                    <img src="public/uploads/${produto.imagem}" class="produto-imagem" alt="${produto.nome}">
                    <p><strong>Preço:</strong> R$${produto.preco.toFixed(2)}</p>
                `;
                produtosLista.appendChild(produtoItem);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

// Carregar os produtos assim que a página for carregada
document.addEventListener('DOMContentLoaded', carregarProdutos);
