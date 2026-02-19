import { v4 as uuid } from 'uuid';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly isActive: boolean,
  ) {}

  static create(data: {
    username: string;
    passwordHash: string;
  }): UserEntity {
    return new UserEntity(
      uuid(),
      data.username,
      data.passwordHash,
      true,
    );
  }
}
