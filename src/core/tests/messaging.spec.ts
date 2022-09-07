import { Messaging } from '../services/messaging';

describe('Messaging', () => {
  test('Should call sendMessage with correct value', async () => {
    const sut = new Messaging();
    const spy = jest.spyOn(sut, 'sendMessage');
    sut.sendMessage('test message');
    expect(spy).toBeCalled();
  });
});
