import { BuyRechargeUseCase } from '../../../../src/modules/recharges/application/buy-recharge.use-case';

describe('BuyRechargeUseCase', () => {

  let useCase: BuyRechargeUseCase;
  let repository: any;
  let eventBus: any;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    };

    eventBus = {
      publish: jest.fn(),
    };

    useCase = new BuyRechargeUseCase(repository, eventBus);
  });

  it('Debería procesar una recarga válida', async () => {
    await useCase.execute(
      'user-1',
      '3123456789',
      5000,
    );

    expect(repository.save).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalled();
  });

  it('Debería lanzar excepción si el teléfono es inválido', async () => {
    await expect(
      useCase.execute('user-1', '9123456789', 5000),
    ).rejects.toThrow();
  });

});
