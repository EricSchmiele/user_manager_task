import { User } from 'src/application/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  }
}
