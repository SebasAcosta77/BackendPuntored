import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { hashSync } from 'bcryptjs';

@Injectable()
export class Registerusecase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(username: string, password: string): Promise<void> {
    const exists = await this.userRepository.findByUsername(username);

    if (exists) {
      throw new ConflictException('El usuario ya existe');
    }

    const passwordHash = hashSync(password, 10);

    const user = UserEntity.create({
      username,
      passwordHash,
    });

    await this.userRepository.save(user);
  }
}
