const request = require('supertest');
const app = require('../backend/src/controller.js'); // Substitua pelo caminho correto do seu arquivo de aplicativo

describe('Testes de API Express', () => {
  it('Deve responder corretamente ao endpoint /api/enviar-dados', async () => {
    const response = await request(app)
      .post('/api/enviar-dados')
      .send({
        date: '2024-01-21',
        smallDogs: 2,
        largeDogs: 1,
      });
    expect(response.status).toBe(200);
    // Adicione mais expectativas conforme necessário
  });

  it('Deve responder corretamente ao endpoint /api/criar-dados', async () => {
    const response = await request(app)
      .post('/api/criar-dados')
      .send({
        name: 'PetShop Teste',
        distance: 10,
        smallWeek: 20,
        largeWeek: 10,
        smallWeekend: 30,
        largeWeekend: 15,
      });
    expect(response.status).toBe(200);
    // Adicione mais expectativas conforme necessário
  });

  it('Deve responder corretamente ao endpoint /api/receber-dados', async () => {
    const response = await request(app).get('/api/receber-dados');
    expect(response.status).toBe(200);
    // Adicione mais expectativas conforme necessário
  });
});
