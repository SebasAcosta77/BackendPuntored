import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/login.use-case';

import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { Registerusecase } from '../../application/register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: Registerusecase,
  ) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.username, dto.password);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    await this.registerUseCase.execute(dto.username, dto.password);
    return { message: 'Usuario registrado correctamente bro' };
  }
}
