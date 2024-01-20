// backend/src/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

var {getBestPetShop} = require("./script.js");
var {populatePetShops} = require("./database.js");

// Recebendo dados e retornando a melhor alternativa
app.post('/api/enviar-dados', async (req, res) => { 
  var data = {
    date: req.body.date,
    smallDogs: req.body.smallDogs,
    largeDogs: req.body.largeDogs
  }
  
  const resp = await getBestPetShop(data.date, data.smallDogs, data.largeDogs);
  console.log(resp)
  res.json( resp )
});

// iniciando banco de dados
populatePetShops()

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});