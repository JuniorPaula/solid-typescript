export type CartItems = { name: string; price: number };
export type OrderStatus = 'open' | 'closed';

export interface IsEmpty {
  isEmpty(): boolean;
}

export interface Clear {
  clear(): void;
}
