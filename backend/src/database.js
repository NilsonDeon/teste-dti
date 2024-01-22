const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";
let db = null;

if (process.env.NODE_ENV !== "test") {
  const connectionMessage = "Conectado ao banco de dados SQLite";
  db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
      throw err;
    } else {
      console.log(connectionMessage);
      db.run(`
        CREATE TABLE IF NOT EXISTS petshops (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE,
          distance REAL,
          smallWeek REAL,
          largeWeek REAL,
          smallWeekend REAL,
          largeWeekend REAL
        )
      `, (err) => {
        if (err) {
          console.error("Erro ao criar a tabela:", err.message);
        } else {
          populatePetShops();
          console.log("Tabela criada com sucesso.");
        }
      });
    }
  });
} else {
  db = new sqlite3.Database(DBSOURCE);
}

const petShops = {
  1: {
    name: "Meu Canino Feliz",
    distance: 2,
    prices: {
      week: { small: 20, large: 40 },
      weekend: { small: 24, large: 48 },
    },
  },
  2: {
    name: "Vai Rex",
    distance: 1.7,
    prices: {
      week: { small: 15, large: 50 },
      weekend: { small: 20, large: 55 },
    },
  },
  3: {
    name: "ChowChawgas",
    distance: 0.8,
    prices: {
      week: { small: 30, large: 45 },
      weekend: { small: 30, large: 45 },
    },
  },
};

function populatePetShops() {
  Object.values(petShops).forEach((petShop) => {
    db.run(`
      INSERT OR IGNORE INTO petshops (name, distance, smallWeek, largeWeek, smallWeekend, largeWeekend)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      petShop.name,
      petShop.distance,
      petShop.prices.week.small,
      petShop.prices.week.large,
      petShop.prices.weekend.small,
      petShop.prices.weekend.large,
    ], (err) => {
      if (err) {
        console.error("Erro ao inserir dados:", err.message);
      } else {
        console.log(`Dados inseridos para ${petShop.name}`);
      }
    });
  });
}

function getPetShopsFromDB() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM petshops`, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function closeDB() {
  db.close();
}

function insertPetShop(petShop) {
  return new Promise((resolve, reject) => {
    db.run(`
      INSERT OR IGNORE INTO petshops (name, distance, smallWeek, largeWeek, smallWeekend, largeWeekend)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      petShop.name,
      petShop.distance,
      petShop.smallWeek,
      petShop.largeWeek,
      petShop.smallWeekend,
      petShop.largeWeekend,
    ], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`Dados inseridos para ${petShop.name}`);
      }
    });
  });
}

module.exports = { getPetShopsFromDB, insertPetShop, closeDB };
