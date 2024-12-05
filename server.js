// Importando dependências
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;

// Configuração do servidor para usar arquivos estáticos (imagens, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Usando o middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do Multer para salvar imagens enviadas pelo formulário
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads';
        // Verificando se a pasta 'uploads' existe, senão cria
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Salva na pasta 'public/uploads'
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname); // Pega a extensão do arquivo
        cb(null, `${timestamp}${extension}`); // Nome do arquivo será o timestamp + extensão
    }
});
const upload = multer({ storage });

// Rota para exibir os produtos no catálogo (GET)
app.get('/api/produtos', (req, res) => {
    fs.readFile('produtos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de produtos');
        }
        res.json(JSON.parse(data)); // Retorna os produtos como JSON
    });
});

// Rota para adicionar um novo produto (POST)
app.post('/api/produtos', upload.single('imagem'), (req, res) => {
    const { nome, preco } = req.body;
    const imagem = req.file ? req.file.filename : null; // Pega o nome da imagem enviada
    const produto = { id: Date.now(), nome, preco: parseFloat(preco), imagem };

    // Lendo os produtos existentes
    fs.readFile('produtos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de produtos');
        }

        const produtos = JSON.parse(data); // Converte o arquivo JSON para um objeto
        produtos.push(produto); // Adiciona o novo produto

        // Escrevendo os produtos atualizados no arquivo
        fs.writeFile('produtos.json', JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o produto');
            }
            res.status(201).send('Produto adicionado com sucesso!');
        });
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
