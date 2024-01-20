// backend/src/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Rota GET para obter dados
app.get('/api/dados', (req, res) => {
  const dados = { mensagem: 'Bem-vindo ao seu servidor RESTful!' };
  res.json(dados);
});

// Rota POST para receber dados
app.post('/api/enviar-dados', (req, res) => {
  const { date, smallDogs, largeDogs } = req.body;
  console.log('Dados recebidos: ', date, smallDogs, largeDogs);
  res.json({ mensagem: 'Dados recebidos com sucesso!'});
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
