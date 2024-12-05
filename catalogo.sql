-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS catalogo_produtos;

-- Seleciona o banco de dados criado
USE catalogo_produtos;

-- Criação da tabela para armazenar os produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- ID único do produto
    nome VARCHAR(255) NOT NULL,                -- Nome do produto
    preco DECIMAL(10, 2) NOT NULL,             -- Preço do produto (2 casas decimais)
    imagem VARCHAR(255) NOT NULL,              -- Caminho da imagem do produto (URL ou nome do arquivo)
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de adição do produto (automático)
);

-- Exemplo de inserção de produto (substitua os valores conforme necessário)
INSERT INTO produtos (nome, preco, imagem) 
VALUES ('Produto Exemplo', 19.99, 'produto_exemplo.jpg');
