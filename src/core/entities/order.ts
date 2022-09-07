import {
  Clear,
  IsEmpty,
  OrderStatus,
} from './interfaces/shopping-cart-protocols';
import { SendMessageProtocols } from '../protocols/messaging';
import { PersistencyProtocols } from '../protocols/persistency';
import { CustomerProtocol } from './interfaces/customer-protocols';

export class Order {
  private orderStatus: OrderStatus = 'open';

  constructor(
    private readonly isEmpty: IsEmpty,
    private readonly clear: Clear,
    private readonly messaging: SendMessageProtocols,
    private readonly persistency: PersistencyProtocols,
    private readonly customer: CustomerProtocol,
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
    console.log(`
      Seu Pedido foi finalizado: \n
      nome: ${this.customer.getName()}, \n
      Nº de cadastro: ${this.customer.getIDN()}
    `);
  }
}
