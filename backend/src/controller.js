const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

var { getBestPetShop } = require("./script.js");
var { getPetShopsFromDB, insertPetShop } = require("./database.js");

// Recebendo dados e retornando a melhor alternativa
app.post("/api/enviar-dados", async (req, res) => {
  try {
    var data = {
      date: req.body.date,
      smallDogs: req.body.smallDogs,
      largeDogs: req.body.largeDogs,
    };

    const resp = await getBestPetShop(
      data.date,
      data.smallDogs,
      data.largeDogs
    );
    

    res.json(resp);
   
  } catch (error) {
    console.error("Error processing data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/criar-dados", async (req, res) => {
  try {
    var data = {
      name: req.body.name,
      distance: req.body.distance,
      smallWeek: req.body.smallWeek,
      largeWeek: req.body.largeWeek,
      smallWeekend: req.body.smallWeekend,
      largeWeekend: req.body.largeWeekend,
    };

    const resp = await insertPetShop(data);

    res.json(resp);
  } catch (error) {
    console.error("Error creating data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retornando todos os petshops do banco de dados
app.get("/api/receber-dados", async (req, res) => {
  try {
    const objetos = await getPetShopsFromDB();
    res.json(objetos);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});