import { UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract save(user: UserEntity): Promise<void>;
}
