import { PercentDiscount } from '../usecases/discount-percent';

describe('Discount Percent', () => {
  test('Should return the same total if discount percent not are provided', async () => {
    const sut = new PercentDiscount();
    const total = sut.calculate(50);
    expect(total).toBe(50);
  });
});
