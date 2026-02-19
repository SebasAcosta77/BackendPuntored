import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryEventBus {
  publish(event: any) {
    console.log('EVENTO DOMINIO:', event);
  }
}
