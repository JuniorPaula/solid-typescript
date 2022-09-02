import { Persistency } from '../services/persistency';

describe('Persistency', () => {
  test('Should call saveOrder called', async () => {
    const sut = new Persistency();
    const spy = jest.spyOn(sut, 'saveOrder');
    sut.saveOrder();
    expect(spy).toBeCalled();
  });
});
