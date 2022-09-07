import { SendMessageProtocols } from '../protocols/messaging';

export class Messaging implements SendMessageProtocols {
  sendMessage(message: string): void {
    console.log('Mensagem enviada: ' + message);
  }
}
