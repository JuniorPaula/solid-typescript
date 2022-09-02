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

  test('Should remove items on success', async () => {
    const sut = makeSut();
    const result = sut.getItems();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.removeItem(0);
    expect(result).toEqual([]);
  });

  test('Should total() return a correct value for price sum', async () => {
    const sut = makeSut();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.addItems({ name: 'teste3', price: 6 });
    const total = sut.total();
    expect(total).toBe(9);
  });

  test('Should return true if cart items to be empty', async () => {
    const sut = makeSut();
    const isEmpty = sut.isEmpty();
    expect(isEmpty).toBe(true);
  });

  test('Should clear a cart item on success', async () => {
    const sut = makeSut();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.addItems({ name: 'teste3', price: 6 });
    sut.clear();
    const result = sut.getItems();
    expect(result.length).toBe(0);
  });
});
