import { CartItems } from '../entities/interfaces/shopping-cart-protocols';
import { ShoppingCart } from '../entities/shopping-cart';

describe('ShoppingCart', () => {
  test('Should add items on success', async () => {
    const sut = new ShoppingCart();
    const items: CartItems = { name: 'teste1', price: 2.5 };
    sut.addItems(items);
    const result = sut.getItems();
    expect(result).toEqual([{ name: 'teste1', price: 2.5 }]);
  });
});
