export class RechargeAmount {
  constructor(public readonly value: number) {
    if (value < 1000 || value > 100000) {
      throw new Error(
        'El monto debe estar entre 1000 y 100000',
      );
    }
  }
}
