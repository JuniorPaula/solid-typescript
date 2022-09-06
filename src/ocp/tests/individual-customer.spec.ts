import { IndividualCustomer } from '../entities/individual-customer';

describe('IndividualCustomer', () => {
  test('Should returns correct params', async () => {
    const sut = new IndividualCustomer('fake name', 'fake lastname', '11111');

    expect(sut.firstName).toBe('fake name');
    expect(sut.lastName).toBe('fake lastname');
    expect(sut.cpf).toBe('11111');
    expect(sut.getName()).toBe('fake name fake lastname');
    expect(sut.getIDN()).toBe('11111');
  });
});
