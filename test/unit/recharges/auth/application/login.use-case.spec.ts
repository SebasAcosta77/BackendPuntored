import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';



import { LoginUseCase } from 'src/modules/auth/application/login.use-case';
import { UserRepository } from 'src/modules/auth/domain/user.repository';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      findByUsername: jest.fn(),
    } as any;

    jwtService = {
      sign: jest.fn(),
    } as any;

    useCase = new LoginUseCase(userRepository, jwtService);
  });

  it('Debería retornar token cuando las credenciales son válidas o', async () => {
    const passwordHash = bcrypt.hashSync('1234', 10);

    userRepository.findByUsername.mockResolvedValue({
      id: '1',
      username: 'juan',
      passwordHash,
    } as any);

    jwtService.sign.mockReturnValue('mocked-jwt-token');

    const result = await useCase.execute('juan', '1234');

    expect(result).toEqual({ token: 'mocked-jwt-token' });
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('Debería lanzar excepción si el usuario no existe', async () => {
    userRepository.findByUsername.mockResolvedValue(null);

    await expect(useCase.execute('juan', '1234'))
      .rejects
      .toBeInstanceOf(UnauthorizedException);
  });

  it('Debería lanzar excepcionnn si la contraseña es inválida', async () => {
    const passwordHash = bcrypt.hashSync('correct-password', 10);

    userRepository.findByUsername.mockResolvedValue({
      id: '1',
      username: 'juan',
      passwordHash,
    } as any);

    await expect(useCase.execute('juan', 'wrong-password'))
      .rejects
      .toBeInstanceOf(UnauthorizedException);
  });
});
