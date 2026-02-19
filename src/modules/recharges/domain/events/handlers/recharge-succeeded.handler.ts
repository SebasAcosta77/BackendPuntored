import { RechargeSucceededEvent } from '../../../domain/events/recharge-succeeded.event';

export function rechargeSucceededHandler(event: RechargeSucceededEvent) {
  console.log(' Recarga exitosa detectada!');
  console.log('ID:', event.rechargeId);
  console.log('Teléfono:', event.phoneNumber);

  // Intente crear el evento de bus en memoria pero no supe como implemetarlo
  
}
