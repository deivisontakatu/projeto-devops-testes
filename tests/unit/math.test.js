const { sum } = require('../../src/math');

describe('Teste Unitário', () => {
  test('deve somar dois números', () => {
    expect(sum(2, 3)).toBe(5);
  });
});