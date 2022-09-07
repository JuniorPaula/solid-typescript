import { PercentDiscount } from '../usecases/discount-percent';

describe('Discount Percent', () => {
  test('Should return the same total if discount percent not are provided', async () => {
    const sut = new PercentDiscount();
    const total = sut.calculate(50);
    expect(total).toBe(50);
  });

  test('Should return total with discount if discount percent are provided', async () => {
    const sut = new PercentDiscount(0.5);
    const total = sut.calculate(50);
    expect(total).toBe(25);
  });
});
