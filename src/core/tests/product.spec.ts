import { Product } from '../entities/product';

describe('Product', () => {
  test('Should call contructor params with correct values', async () => {
    const sut = new Product('camisa', 23);
    expect(sut.name).toBe('camisa');
    expect(sut.price).toBe(23);
  });
});
