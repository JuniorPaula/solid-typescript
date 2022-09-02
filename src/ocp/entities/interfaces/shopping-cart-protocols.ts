export type CartItems = { name: string; price: number };
export type OrderStatus = 'open' | 'closed';

export interface ShoppingCartProtocols {
  addItems(item: CartItems): void;
  getItems(): Readonly<CartItems[]>;
  removeItem(index: number): void;
  total(): number;
}

export interface IsEmpty {
  isEmpty(): boolean;
}

export interface Clear {
  clear(): void;
}
