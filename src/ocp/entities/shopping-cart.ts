import {
  CartItems,
  Clear,
  IsEmpty,
  ShoppingCartProtocols,
} from './interfaces/shopping-cart-protocols';

export class ShoppingCart implements ShoppingCartProtocols, IsEmpty, Clear {
  private readonly items: CartItems[] = [];

  addItems(item: CartItems): void {
    this.items.push(item);
  }

  getItems(): Readonly<CartItems[]> {
    return this.items;
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  total(): number {
    return +this.items.reduce((ac, value) => ac + value.price, 0).toFixed(2);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items.length = 0;
  }
}