import { CustomerProtocol } from '../entities/interfaces/customer-protocols';
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

const fakeCustomer = (): CustomerProtocol => {
  class CustomerStub implements CustomerProtocol {
    getName(): string {
      return 'fake name';
    }
    getIDN(): string {
      return '000.000.000-00';
    }
  }

  return new CustomerStub();
};

type SutTypes = {
  sut: Order;
  isEmptyStub: IsEmpty;
  clearStub: Clear;
  messagingStub: SendMessageProtocols;
  persistencyStub: PersistencyProtocols;
  customerStub: CustomerProtocol;
};

const makeSut = (): SutTypes => {
  const isEmptyStub = fakeIsEmpty();
  const clearStub = fakeClear();
  const messagingStub = fakeMessaging();
  const persistencyStub = fakePersistency();
  const customerStub = fakeCustomer();
  const sut = new Order(
    isEmptyStub,
    clearStub,
    messagingStub,
    persistencyStub,
    customerStub,
  );

  return {
    sut,
    isEmptyStub,
    clearStub,
    messagingStub,
    persistencyStub,
    customerStub,
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

  test('Should call saveOrder', async () => {
    const { sut, persistencyStub, isEmptyStub } = makeSut();
    jest.spyOn(isEmptyStub, 'isEmpty').mockReturnValueOnce(false);
    const spy = jest.spyOn(persistencyStub, 'saveOrder');
    sut.checkout();
    expect(spy).toBeCalled();
  });

  test('Should call clear', async () => {
    const { sut, clearStub, isEmptyStub } = makeSut();
    jest.spyOn(isEmptyStub, 'isEmpty').mockReturnValueOnce(false);
    const spy = jest.spyOn(clearStub, 'clear');
    sut.checkout();
    expect(spy).toBeCalled();
  });

  test('Should return correct name when Customer is called', async () => {
    const { sut, customerStub, isEmptyStub } = makeSut();
    jest.spyOn(isEmptyStub, 'isEmpty').mockReturnValueOnce(false);
    const customerName = jest.spyOn(customerStub, 'getName');
    sut.checkout();
    expect(customerName).toHaveReturnedWith('fake name');
  });

  test('Should return correct number of the register when Customer is called', async () => {
    const { sut, customerStub, isEmptyStub } = makeSut();
    jest.spyOn(isEmptyStub, 'isEmpty').mockReturnValueOnce(false);
    const customerRegisterNumber = jest.spyOn(customerStub, 'getIDN');
    sut.checkout();
    expect(customerRegisterNumber).toHaveReturnedWith('000.000.000-00');
  });
});
