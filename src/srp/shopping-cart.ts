type CartItems = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCart {
  private readonly items: CartItems[] = [];
  private orderStatus: OrderStatus = 'open';

  addItems(item: CartItems): void {
    this.items.push(item);
  }

  getItems(): Readonly<CartItems[]> {
    return this.items;
  }

  getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  removeItem(index: number): void {
    this.items.slice(index, 1);
  }

  total(): number {
    return +this.items.reduce((ac, value) => ac + value.price, 0).toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this.orderStatus = 'closed';
    this.sendMessage('Seu pedido foi recebido');
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  sendMessage(message: string): void {
    console.log('Mensagem enviada: ' + message);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso!!!');
  }

  clear(): void {
    this.items.length = 0;
  }
}

const shoppingCart = new ShoppingCart();
shoppingCart.addItems({ name: 'Camiseta', price: 49.9 });
shoppingCart.addItems({ name: 'Bermuda', price: 79 });
shoppingCart.addItems({ name: 'Boné', price: 18.5 });

console.log(shoppingCart.getItems());
console.log(shoppingCart.total());
shoppingCart.checkout();
console.log(shoppingCart.getOrderStatus());
