// Importa o módulo Express
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); 
/////////////////////////////////
//MYSQL
/////////////////////////////////
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'Estacionamento',
    password: 'Pga1914!',
    database: 'estacionamento'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

const PORT = 3000;

/////////////////////////////////
//Ellen Rocha Cadastro de Veículos
/////////////////////////////////
app.get('/', (req, res) => {
    res.send('Bem vindo ao Estacionamento blueSkye Joinville');
});

app.post('/veiculo', (req, res) => {
   
    const { placa_veiculo, data_entrada, data_saida, valor_hora } = req.body;

    if (!placa_veiculo || !data_entrada || !data_saida || !valor_hora) {
        return res.status(400).send('Erro: Todos os campos são obrigatórios.');
    }
    
    const sql = `
        INSERT INTO controle_movimento_veiculos (placa_veiculo, data_entrada, data_saida, valor_hora)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [placa_veiculo, data_entrada, data_saida, valor_hora], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao cadastrar movimento de veículo.');
        } else {
            res.status(201).send('Movimento de veículo cadastrado com sucesso!');
        }
    });
});
/////////////////////////////////
//Geraldo
/////////////////////////////////
app.post('/reserva', (req, res) => {
    const { placa_veiculo, data_reserva, nome_cliente, numero_cnh, cpf, telefone } = req.body;

    if (!placa_veiculo || !data_reserva || !nome_cliente || !numero_cnh || !cpf || !telefone) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const sql = `
        INSERT INTO reservas (placa_veiculo, data_reserva, nome_cliente, numero_cnh, CPF, telefone)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [placa_veiculo, data_reserva, nome_cliente, numero_cnh, cpf, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao reservar o veículo.');
        } else {
            res.status(201).send(`Reserva de ID ${result.insertId} cadastrada com sucesso!`);
        }
    });
});

/////////////////////////////////
//Ian
/////////////////////////////////
app.post('/tarifa', (req, res) => {
    const { opcao, valor } = req.body;

    if (!opcao || !valor) {
        return res.status(400).send('Erro: Todos os campos são obrigatórios.');
    }

    const opcoesValidas = ['H', 'M'];
    if (!opcoesValidas.includes(opcao)) {
        return res.status(400).send('Erro: O campo "opcao" deve ser "H" (Hora) ou "M" (Minuto).');
    }
    const sql = `
        INSERT INTO tarifa (opcao, valor)
        VALUES (?, ?)
    `;

    db.query(sql, [opcao, valor], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao cadastrar a tarifa.');
        }

        res.status(201).send('Tarifa cadastrada com sucesso!');
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});