import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { CreateAllUsers } from './create-all-users';
import { DeleteUserAvatar } from './delete-user-avatar';
import { GetUserAvatar } from './get-user-avatar';
import * as fs from 'fs';
import { GetUser } from './get-user';

describe('Delete user avatar', () => {
  it('should be able to delete the avatar of a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUserAvatar = new DeleteUserAvatar(usersRepository);
    const getUserAvatar = new GetUserAvatar(usersRepository);
    const createAllUsers = new CreateAllUsers(usersRepository);
    const getUser = new GetUser(usersRepository);

    await createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 1,
    });

    await getUserAvatar.execute({
      userId: 3,
    });

    const { user } = await getUser.execute({
      userId: 3,
    });

    await deleteUserAvatar.execute({
      userId: 3,
    });

    expect(usersRepository.users.length).toEqual(5);

    expect(fs.existsSync(user.avatar)).toEqual(false);
  });

  it('should not be able to delete the avatar of a non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUserAvatar = new DeleteUserAvatar(usersRepository);
    const getUserAvatar = new GetUserAvatar(usersRepository);
    const createAllUsers = new CreateAllUsers(usersRepository);

    await createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 1,
    });

    await getUserAvatar.execute({
      userId: 3,
    });

    expect(() => {
      return deleteUserAvatar.execute({
        userId: 14,
      });
    }).rejects.toThrow(Error);
  });

  it('should not be able to delete if there are no users', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const deleteUserAvatar = new DeleteUserAvatar(usersRepository);

    expect(() => {
      return deleteUserAvatar.execute({
        userId: 1,
      });
    }).rejects.toThrow(Error);
  });
});
