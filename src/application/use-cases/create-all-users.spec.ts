import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { CreateAllUsers } from './create-all-users';

describe('Create all users from reqres', () => {
  it('should be able to create many users from reqres', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createAllUsers = new CreateAllUsers(usersRepository);

    await createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 2,
    });

    expect(usersRepository.users).toHaveLength(12);
  });

  it('should not be able to create many users from a wrong url', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createAllUsers = new CreateAllUsers(usersRepository);

    expect(() => {
      return createAllUsers.execute({
        url: 'https://wrong.url/api/users',
        pages: 2,
      });
    }).rejects.toThrow(Error);
  });
});
