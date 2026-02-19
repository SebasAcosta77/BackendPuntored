export class PhoneNumber {
  constructor(public readonly value: string) {
    const regex = /^3\d{9}$/;

    if (!regex.test(value)) {
      throw new Error(
        'El número debe iniciar en 3 y tener 10 dígitos numéricos',
      );
    }
  }
}
