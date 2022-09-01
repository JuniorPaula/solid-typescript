import { CartItems } from './interfaces/shopping-cart-protocols';

export class ShoppingCart {
  private readonly items: CartItems[] = [];

  addItems(item: CartItems): void {
    this.items.push(item);
  }

  getItems(): Readonly<CartItems[]> {
    return this.items;
  }

  removeItem(index: number): void {
    this.items.slice(index, 1);
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
