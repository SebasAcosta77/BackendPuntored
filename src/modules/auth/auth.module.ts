import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

import { AuthController } from './infraestructure/controllers/auth.controller';
import { LoginUseCase } from './application/login.use-case';
import { Registerusecase } from './application/register.usecase';
import { UserRepository } from './domain/user.repository';
import { UserTypeOrmRepository } from './infraestructure/repositories/user.typeorm.repository';
import { UserOrmEntity } from 'src/database/entities/user.orm-entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '1h') as StringValue,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    Registerusecase,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
  ],
})
export class AuthModule {}
