import {
  CustomerProtocol,
  IndividualCustomerProtocol,
} from './interfaces/customer-protocols';

export class IndividualCustomer
  implements CustomerProtocol, IndividualCustomerProtocol
{
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly cpf: string,
  ) {}

  getName(): string {
    return this.firstName + ' ' + this.lastName;
  }
  getIDN(): string {
    return this.cpf;
  }
}
