import { DiscountProtocol } from '../protocols/discount';
import {
  CartItems,
  Clear,
  IsEmpty,
} from './interfaces/shopping-cart-protocols';

export class ShoppingCart implements IsEmpty, Clear {
  private readonly items: CartItems[] = [];

  constructor(private readonly discount: DiscountProtocol) {}

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

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items.length = 0;
  }
}
