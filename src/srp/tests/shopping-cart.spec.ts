import { CartItems } from '../entities/interfaces/shopping-cart-protocols';
import { ShoppingCart } from '../entities/shopping-cart';

const fakeItems = (): CartItems => ({
  name: 'teste1',
  price: 2.5,
});

const makeSut = (): ShoppingCart => {
  const sut = new ShoppingCart();
  return sut;
};

describe('ShoppingCart', () => {
  test('Should add items on success', async () => {
    const sut = makeSut();
    const items = fakeItems();
    sut.addItems(items);
    const result = sut.getItems();
    expect(result).toEqual([{ name: 'teste1', price: 2.5 }]);
  });
});
