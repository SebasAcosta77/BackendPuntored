import { EventBus } from '../../domain/events/event-bus.interface';

type EventHandler = (event: any) => void;

export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe(eventName: string, handler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }

    this.handlers.get(eventName)!.push(handler);
  }

  publish(event: any): void {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName) || [];

    handlers.forEach(handler => handler(event));
  }
}
