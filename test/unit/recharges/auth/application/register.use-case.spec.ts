import { ConflictException } from '@nestjs/common';
import { Registerusecase } from 'src/modules/auth/application/register.usecase';

import { UserRepository } from 'src/modules/auth/domain/user.repository';


describe('RegisterUseCase', () => {
  let useCase: Registerusecase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findByUsername: jest.fn(),
      save: jest.fn(),
    } as any;

    useCase = new Registerusecase(userRepository);
  });

  it('Debería registrar un nuevo usuario', async () => {
    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.save.mockResolvedValue(undefined);

    await expect(useCase.execute('juan', '1234')).resolves.toBeUndefined();

    expect(userRepository.findByUsername).toHaveBeenCalledWith('juan');
    expect(userRepository.save).toHaveBeenCalled();
  });

  it(' Debería lanzar excepción si el usuario ya existe', async () => {
    userRepository.findByUsername.mockResolvedValue({
      id: '1',
      username: 'juan',
      passwordHash: 'hashed',
    } as any);

    await expect(useCase.execute('juan', '1234'))
      .rejects
      .toBeInstanceOf(ConflictException);

    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
