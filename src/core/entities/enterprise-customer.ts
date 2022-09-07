import {
  CustomerProtocol,
  EnterpriseCustomerProtocol,
} from './interfaces/customer-protocols';

export class EnterpriseCustomer
  implements CustomerProtocol, EnterpriseCustomerProtocol
{
  constructor(readonly name: string, readonly cnpj: string) {}

  getName(): string {
    return this.name;
  }
  getIDN(): string {
    return this.cnpj;
  }
}
