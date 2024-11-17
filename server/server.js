// Importa o módulo Express
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); 


// Configura o MySQL com os dados fornecidos
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'Estacionamento',
    password: 'Pga1914!',
    database: 'estacionamento'
});

// Conecta ao MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

// Define a porta do servidor
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Olá testando servidor node');
});
app.post('/veiculos', (req, res) => {
    const { placa_veiculo, data_entrada, data_saida, valor_hora } = req.body;

    // Cria o comando SQL para inserção
    const sql = `
        INSERT INTO controle_movimento_veiculos (placa_veiculo, data_entrada, data_saida, valor_hora)
        VALUES (?, ?, ?, ?)
    `;

    // Executa a query de inserção com os dados do body
    db.query(sql, [placa_veiculo, data_entrada, data_saida, valor_hora], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao cadastrar movimento de veículo.');
        } else {
            res.status(201).send('Movimento de veículo cadastrado com sucesso!');
        }
    });
});
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});