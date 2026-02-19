import { RechargeAmount } from '../../../../src/modules/recharges/domain/value-objects/recharge-amount.vo';

describe('RechargeAmount ValueObject', () => {

  it('Debería crear una cantidad válida', () => {
    const amount = new RechargeAmount(5000);
    expect(amount.value).toBe(5000);
  });

  it('Debería lanzar excepción si la cantidad es menor a 1000', () => {
    expect(() => {
      new RechargeAmount(500);
    }).toThrow();
  });

  it('Debería lanzar excepción si la cantidad es mayor a 100000', () => {
    expect(() => {
      new RechargeAmount(200000);
    }).toThrow();
  });

});
