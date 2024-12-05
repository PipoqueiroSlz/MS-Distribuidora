// Catálogo de produtos
class CatalogoMercearia {
    constructor() {
        this.produtos = [];
    }

    // Adiciona um novo produto ao catálogo
    adicionarProduto(nome, preco, categoria, estoque) {
        const produto = {
            id: this.produtos.length + 1,
            nome,
            preco,
        };
        this.produtos.push(produto);
        console.log(`Produto "${nome}" adicionado com sucesso!`);
    }

    // Lista todos os produtos do catálogo
    listarProdutos() {
        console.log("Catálogo de Produtos:");
        if (this.produtos.length === 0) {
            console.log("Nenhum produto cadastrado.");
            return;
        }
        this.produtos.forEach(produto => {
            console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$${produto.preco.toFixed(2)}`);
        });
    }

    // Busca um produto pelo nome
    buscarProduto(nome) {
        const encontrados = this.produtos.filter(produto => produto.nome.toLowerCase().includes(nome.toLowerCase()));
        if (encontrados.length === 0) {
            console.log(`Nenhum produto encontrado com o nome "${nome}".`);
        } else {
            console.log("Produtos encontrados:");
            encontrados.forEach(produto => {
                console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$${produto.preco.toFixed(2)}`);
            });
        }
    }
}

// Exemplo de uso do catálogo
const catalogo = new CatalogoMercearia();

// Adicionando produtos
catalogo.adicionarProduto("Arroz", 5.99, "Grãos", 50);


// Listando produtos
catalogo.listarProdutos();

// Buscando produtos
catalogo.buscarProduto("Arroz");
catalogo.buscarProduto("Leite");
