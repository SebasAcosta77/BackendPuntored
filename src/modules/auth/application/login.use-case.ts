import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from '../domain/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Usuario no registrado');
    }

    const passwordValid = bcrypt.compareSync(password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }
}
