import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepository } from '../../domain/user.repository';

import { UserOrmEntity } from 'src/database/entities/user.orm-entity';
import { UserEntity } from '../../domain/user.entity';


@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { username, isActive: true },
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.username,
      user.passwordHash,
      user.isActive,
    );
  }

  async save(user: UserEntity): Promise<void> {
    await this.repository.save({
      id: user.id,
      username: user.username,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
    });
  }
}

