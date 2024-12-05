// Armazena os produtos
const produtos = [];

// Referências aos elementos da interface
const formProduto = document.getElementById("form-produto");
const buscarInput = document.getElementById("buscar-nome");
const btnBuscar = document.getElementById("btn-buscar");
const listaProdutos = document.getElementById("produtos-lista");

// Adiciona um produto ao catálogo
formProduto.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const imagem = document.getElementById("imagem").files[0]; // Arquivo de imagem
    const categoria = document.getElementById("categoria").value;
    const estoque = parseInt(document.getElementById("estoque").value);

    const produto = { 
        id: produtos.length + 1, 
        nome, 
        preco, 
        imagem,
        categoria, 
        estoque 
    };
    produtos.push(produto);

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("estoque").value = "";

    renderizarProdutos(produtos);
    alert(`Produto "${nome}" adicionado com sucesso!`);
});

// Renderiza a lista de produtos
function renderizarProdutos(lista) {
    listaProdutos.innerHTML = "";
    lista.forEach((produto) => {
        const produtoItem = document.createElement("div");
        produtoItem.classList.add("produto-item");
        produtoItem.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="${URL.createObjectURL(produto.imagem)}" class="produto-imagem" alt="${produto.nome}">
            <p><strong>Preço:</strong> R$${produto.preco.toFixed(2)}</p>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
            <p><strong>Estoque:</strong> ${produto.estoque}</p>
            <button class="btn-editar">Editar</button>
            <button class="btn-excluir">Excluir</button>
        `;
        listaProdutos.appendChild(produtoItem);

        // Editar Produto
        const btnEditar = produtoItem.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => {
            alert(`Editar produto: ${produto.nome}`);
        });

        // Excluir Produto
        const btnExcluir = produtoItem.querySelector(".btn-excluir");
        btnExcluir.addEventListener("click", () => {
            const index = produtos.indexOf(produto);
            if (index > -1) {
                produtos.splice(index, 1);
                renderizarProdutos(produtos);
                alert(`Produto "${produto.nome}" excluído com sucesso!`);
            }
        });
    });
}

// Busca produtos pelo nome
btnBuscar.addEventListener("click", () => {
    const termo = buscarInput.value.toLowerCase();
    const resultados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(termo)
    );

    if (resultados.length > 0) {
        renderizarProdutos(resultados);
    } else {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    }
});
