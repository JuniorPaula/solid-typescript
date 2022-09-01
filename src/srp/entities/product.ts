import { CartItems } from './interfaces/shopping-cart-protocols';

export class Product implements CartItems {
  constructor(public name: string, public price: number) {}
}
