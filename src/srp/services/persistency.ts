import { PersistencyProtocols } from '../protocols/persistency';

export class Persistency implements PersistencyProtocols {
  saveOrder(): void {
    console.log('Pedido salvo com sucesso!!!');
  }
}
