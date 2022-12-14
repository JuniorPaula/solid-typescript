import { CartItems } from '../entities/interfaces/shopping-cart-protocols';
import { ShoppingCart } from '../entities/shopping-cart';
import { DiscountProtocol } from '../protocols/discount';

const fakeItems = (): CartItems => ({
  name: 'teste1',
  price: 2.5,
});

const fakeDiscount = (): DiscountProtocol => {
  class DiscountStub implements DiscountProtocol {
    calculate(price: number): number {
      return price - price * 0.5;
    }
  }

  return new DiscountStub();
};

type SutTypes = {
  sut: ShoppingCart;
  discountStub: DiscountProtocol;
};

const makeSut = (): SutTypes => {
  const discountStub = fakeDiscount();
  const sut = new ShoppingCart(discountStub);
  return {
    sut,
    discountStub,
  };
};

describe('ShoppingCart', () => {
  test('Should add items on success', async () => {
    const { sut } = makeSut();
    const items = fakeItems();
    sut.addItems(items);
    const result = sut.getItems();
    expect(result).toEqual([{ name: 'teste1', price: 2.5 }]);
  });

  test('Should remove items on success', async () => {
    const { sut } = makeSut();
    const result = sut.getItems();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.removeItem(0);
    expect(result).toEqual([]);
  });

  test('Should total() return a correct value for price sum', async () => {
    const { sut } = makeSut();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.addItems({ name: 'teste3', price: 6 });
    const total = sut.total();
    expect(total).toBe(9);
  });

  test('Should return true if cart items to be empty', async () => {
    const { sut } = makeSut();
    const isEmpty = sut.isEmpty();
    expect(isEmpty).toBe(true);
  });

  test('Should clear a cart item on success', async () => {
    const { sut } = makeSut();
    sut.addItems({ name: 'teste2', price: 3 });
    sut.addItems({ name: 'teste3', price: 6 });
    sut.clear();
    const result = sut.getItems();
    expect(result.length).toBe(0);
  });

  test('Should return a total with discount', async () => {
    const { sut, discountStub } = makeSut();
    sut.addItems({ name: 'teste2', price: 100 });
    jest.spyOn(discountStub, 'calculate');
    const discount = sut.totalWithDiscount();
    expect(discount).toBe(50);
  });
});
