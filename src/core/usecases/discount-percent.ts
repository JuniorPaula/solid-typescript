import { DiscountProtocol } from '../protocols/discount';

export class PercentDiscount implements DiscountProtocol {
  constructor(public readonly discount: number = 0) {}
  calculate(price: number): number {
    return price - price * this.discount;
  }
}
