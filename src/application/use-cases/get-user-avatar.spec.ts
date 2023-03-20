import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { CreateAllUsers } from './create-all-users';
import { GetUserAvatar } from './get-user-avatar';

describe('Get user', () => {
  it('should be able to get the avatar of a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserAvatar = new GetUserAvatar(usersRepository);
    const createAllUsers = new CreateAllUsers(usersRepository);

    await createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 2,
    });

    const { avatar } = await getUserAvatar.execute({
      userId: 2,
    });

    expect(avatar).toBeTruthy();
  });

  it('should not be able to get the avatar of a non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserAvatar = new GetUserAvatar(usersRepository);
    const createAllUsers = new CreateAllUsers(usersRepository);

    await createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 2,
    });

    expect(() => {
      return getUserAvatar.execute({
        userId: 14,
      });
    }).rejects.toThrow(Error);
  });
});
