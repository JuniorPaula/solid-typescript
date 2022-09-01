import { Clear, IsEmpty } from '../entities/interfaces/shopping-cart-protocols';
import { Order } from '../entities/order';
import { SendMessageProtocols } from '../protocols/messaging';
import { PersistencyProtocols } from '../protocols/persistency';

const fakeIsEmpty = (): IsEmpty => {
  class isEmptyStub implements IsEmpty {
    isEmpty(): boolean {
      return true;
    }
  }
  return new isEmptyStub();
};

const fakeClear = (): Clear => {
  class ClearStub implements Clear {
    clear(): void {
      console.log('Method not implemented.');
    }
  }
  return new ClearStub();
};

const fakeMessaging = (): SendMessageProtocols => {
  class MessagingStub implements SendMessageProtocols {
    sendMessage(message: string): void {
      console.log('Mensagem enviada: ' + message);
    }
  }
  return new MessagingStub();
};

const fakePersistency = (): PersistencyProtocols => {
  class PersistencyStub implements PersistencyProtocols {
    saveOrder(): void {
      console.log('Pedido salvo com sucesso!!!');
    }
  }
  return new PersistencyStub();
};

type SutTypes = {
  sut: Order;
  isEmptyStub: IsEmpty;
  clearStub: Clear;
  messagingStub: SendMessageProtocols;
  persistencyStub: PersistencyProtocols;
};

const makeSut = (): SutTypes => {
  const isEmptyStub = fakeIsEmpty();
  const clearStub = fakeClear();
  const messagingStub = fakeMessaging();
  const persistencyStub = fakePersistency();
  const sut = new Order(isEmptyStub, clearStub, messagingStub, persistencyStub);

  return {
    sut,
    isEmptyStub,
    clearStub,
    messagingStub,
    persistencyStub,
  };
};

describe('Order', () => {
  test('Should return order status to be open', async () => {
    const { sut } = makeSut();
    const orderStatus = sut.getOrderStatus();
    expect(orderStatus).toBe('open');
  });

  test('Should call isEmpty', async () => {
    const { sut, isEmptyStub } = makeSut();
    const spy = jest.spyOn(isEmptyStub, 'isEmpty');
    sut.checkout();
    expect(spy).toBeCalled();
  });

  test('Should call sendMesasge', async () => {
    const { sut, messagingStub, isEmptyStub } = makeSut();
    jest.spyOn(isEmptyStub, 'isEmpty').mockReturnValueOnce(false);
    const spy = jest.spyOn(messagingStub, 'sendMessage');
    sut.checkout();
    expect(spy).toHaveBeenCalledWith('Seu pedido foi recebido');
  });
});
