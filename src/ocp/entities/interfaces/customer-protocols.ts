export interface CustomerProtocol {
  getName(): string;
  getIDN(): string;
}

export type IndividualCustomerProtocol = {
  firstName: string;
  lastName: string;
  cpf: string;
};

export type EnterpriseCustomerProtocol = {
  name: string;
  cnpj: string;
};
