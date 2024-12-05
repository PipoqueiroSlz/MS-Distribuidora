const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // substitua pelo seu usuário do MySQL
    password: '', // substitua pela sua senha do MySQL
    database: 'ms_distribuidora'
});

// Verifica se a conexão foi bem-sucedida
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos (como imagens)

// Configurar o armazenamento de arquivos (usando o multer para imagens)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para a imagem
    }
});
const upload = multer({ storage });

// Rota para adicionar um produto
app.post('/api/produtos', upload.single('imagem'), (req, res) => {
    const { nome, preco } = req.body;
    const imagem = req.file.filename; // O nome do arquivo da imagem

    const query = 'INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)';
    db.query(query, [nome, preco, imagem], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            return res.status(500).send('Erro ao adicionar produto');
        }
        res.status(201).json({ id: result.insertId, nome, preco, imagem });
    });
});

// Rota para listar todos os produtos
app.get('/api/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao obter produtos:', err);
            return res.status(500).send('Erro ao obter produtos');
        }
        res.status(200).json(results);
    });
});

// Inicializando o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
