const { getPetShopsFromDB } = require("./database.js");
/* const petShops = {
      name: data.name,
      distance: data.distance,
      smallWeek: data.smallWeek,
      largeWeek: data.largeWeek,
      smallWeekend: data.smallWeekend,
      largeWeekend: data.largeWeekend,
    }; */
    
async function getBestPetShop(date, smallDogs, largeDogs) {
  var day = new Date(date);
  var isWeekend = day.getDay() === 5 || day.getDay() === 6;
  var price = Infinity;
  var selectedPetShop = "";
  var distance = 0;

  try {
    // receber os objetos do banco de dados
    const data = await getPetShopsFromDB();

    if (isWeekend) {
      // iterar sobre os objetos de data, comparando os preços e retonar o menor
      data.forEach((petShop) => {
        var petShopPrice = petShop.smallWeekend * smallDogs + petShop.largeWeekend * largeDogs;
        if (petShopPrice < price) {
          price = petShopPrice;
          selectedPetShop = petShop.name;
          distance = petShop.distance;
        }
      });
    } else {
      // iterar sobre os objetos de data, comparando os preços e retonar o menor
      data.forEach((petShop) => {
        var petShopPrice = petShop.smallWeek * smallDogs + petShop.largeWeek * largeDogs;
        if (petShopPrice < price) {
          price = petShopPrice;
          selectedPetShop = petShop.name;
          distance = petShop.distance;
        }
      });
    }

    console.log("selectedPetShop: " + selectedPetShop + " price: " + price);

    return {
      name: selectedPetShop,
      price: price,
    };

  } catch (error) {
    // tratar exceções aqui
    console.error(error);
  }
}

module.exports = { getBestPetShop };