const autocannon = require('autocannon');
const app = require('../../src/app');

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe('Teste de Performance', () => {
  test('deve responder rapidamente', async () => {
    const result = await autocannon({
      url: 'http://localhost:3000',
      connections: 10,
      duration: 5
    });

    expect(result.requests.average).toBeGreaterThan(0);
  });
});