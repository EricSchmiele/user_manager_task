import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(userId: number): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract countMany(): Promise<number>;
  abstract delete(userId: number): Promise<void>;
}
