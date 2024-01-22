const { getPetShopsFromDB } = require("./database.js");

async function getBestPetShop(date, smallDogs, largeDogs) {
  const day = new Date(date);
  const isWeekend = day.getDay() === 5 || day.getDay() === 6;
  let price = Infinity;
  let selectedPetShop = "";
  let distance = 0;

  try {
    const data = await getPetShopsFromDB();

    const getPrice = (petShop, isWeekend) => {
      const pricingKey = isWeekend ? 'Weekend' : 'Week';
      return petShop[`small${pricingKey}`] * smallDogs + petShop[`large${pricingKey}`] * largeDogs;
    };

    data.forEach((petShop) => {
      const petShopPrice = getPrice(petShop, isWeekend);

      if (petShopPrice < price) {
        price = petShopPrice;
        selectedPetShop = petShop.name;
        distance = petShop.distance;
      }
    });

    return {
      name: selectedPetShop,
      price: price,
    };

  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getBestPetShop };
