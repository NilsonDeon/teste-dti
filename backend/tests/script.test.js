const { getBestPetShop } = require('../src/script.js');

describe('getBestPetShop', () => {
  // Suponhamos que você tenha uma função de mock para getPetShopsFromDB
  const mockGetPetShopsFromDB = jest.fn(() => [
    {
        name: "Meu Canino Feliz",
        distance: 2,
        prices: {
          week: { small: 20, large: 40 },
          weekend: { small: 24, large: 48 },
        },
    },
    {
      name: "Vai Rex",
      distance: 1.7,
      prices: {
        week: { small: 15, large: 50 },
        weekend: { small: 20, large: 55 },
      },
    },
    {
        name: "ChowChawgas",
        distance: 0.8,
        prices: {
        week: { small: 30, large: 45 },
        weekend: { small: 30, large: 45 },
        },
    }
  ]);

  // Substitua a função original por nossa função mock
  jest.mock('../src/database.js', () => ({
    getPetShopsFromDB: mockGetPetShopsFromDB,
  }));

  it('deve retornar o pet shop mais barato para dias de semana (Meu Canino Feliz)', async () => {
    const result = await getBestPetShop('2024-03-15', 2, 1);
    expect(result.name).toBe('Meu Canino Feliz');
    expect(result.price).toBe(80); 
  });

  it('deve retornar o pet shop mais barato para fins de semana (Meu Canino Feliz)', async () => {
    const result = await getBestPetShop('2024-03-16', 1, 1);
    expect(result.name).toBe('Meu Canino Feliz');
    expect(result.price).toBe(72); 
  });

  it('deve retornar o pet shop mais barato para dias de semana (Vai Rex)', async () => {
    const result = await getBestPetShop('2024-03-15', 1, 0);
    expect(result.name).toBe('Vai Rex');
    expect(result.price).toBe(15); 
  });

  it('deve retornar o pet shop mais barato para fins de semana (ChowChawgas)', async () => {
    const result = await getBestPetShop('2024-03-16', 0, 1);
    expect(result.name).toBe('ChowChawgas');
    expect(result.price).toBe(45); 
  });

});
