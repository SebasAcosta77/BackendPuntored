import { PhoneNumber } from '../../../../src/modules/recharges/domain/value-objects/phone-number.vo';

describe('PhoneNumber ValueObject', () => {

  it('Debería crear un número telefónico válido', () => {
    const phone = new PhoneNumber('3123456789');
    expect(phone.value).toBe('3123456789');
  });

  it('Debería lanzar excepción si no comienza con 3', () => {
    expect(() => {
      new PhoneNumber('9123456789');
    }).toThrow();
  });

  it('Debería lanzar excepción si la longitud no es 10', () => {
    expect(() => {
      new PhoneNumber('31234');
    }).toThrow();
  });

  it('Debería lanzar excepción si contiene valores no numéricos', () => {
    expect(() => {
      new PhoneNumber('3abcdefgh');
    }).toThrow();
  });

});
