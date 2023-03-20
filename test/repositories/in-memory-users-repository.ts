import { User } from '../../src/application/entities/user';
import { UsersRepository } from '../../src/application/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User) {
    user.id = this.users.length;
    this.users.push(user);
  }

  async findById(userId: number) {
    const user = this.users.find((item) => item.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async update(user: User) {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }

  async countMany() {
    return this.users.length;
  }

  async delete(userId: number) {
    const userIndex = this.users.findIndex((item) => item.id === userId);

    this.users.splice(userIndex, 1);
  }
}
