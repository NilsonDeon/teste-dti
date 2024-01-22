const { getPetShopsFromDB, insertPetShop } = require('../src/database.js'); // Substitua pelo caminho real do seu arquivo

// Testes para a função getPetShopsFromDB
describe('getPetShopsFromDB', () => {
  it('deve retornar uma lista de pet shops do banco de dados', async () => {
    const petShops = await getPetShopsFromDB();
    expect(petShops.length).toBeGreaterThan(0);
  });
});

// Testes para a função insertPetShop
describe('insertPetShop', () => {
  it('deve inserir um novo pet shop no banco de dados', async () => {
    const petShop = {
      name: 'Novo Pet Shop',
      distance: 1.5,
      smallWeek: 25,
      largeWeek: 45,
      smallWeekend: 30,
      largeWeekend: 50,
    };
    const result = await insertPetShop(petShop);
    expect(result).toBe(`Dados inseridos para ${petShop.name}`);
  });
  
});

