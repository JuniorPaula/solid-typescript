import { EnterpriseCustomer } from '../entities/enterprise-customer';

describe('EnterpriseCustomer', () => {
  test('Should returns correct params', async () => {
    const sut = new EnterpriseCustomer('fake name', '11111');

    expect(sut.name).toBe('fake name');
    expect(sut.cnpj).toBe('11111');
    expect(sut.getName()).toBe('fake name');
    expect(sut.getIDN()).toBe('11111');
  });
});
