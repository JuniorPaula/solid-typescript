import {
  Clear,
  IsEmpty,
  OrderStatus,
} from './interfaces/shopping-cart-protocols';
import { SendMessageProtocols } from '../protocols/messaging';
import { PersistencyProtocols } from '../protocols/persistency';

export class Order {
  private orderStatus: OrderStatus = 'open';

  constructor(
    private readonly isEmpty: IsEmpty,
    private readonly clear: Clear,
    private readonly messaging: SendMessageProtocols,
    private readonly persistency: PersistencyProtocols,
  ) {}

  getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  checkout(): void {
    if (this.isEmpty.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this.orderStatus = 'closed';
    this.messaging.sendMessage('Seu pedido foi recebido');
    this.persistency.saveOrder();
    this.clear.clear();
  }
}
