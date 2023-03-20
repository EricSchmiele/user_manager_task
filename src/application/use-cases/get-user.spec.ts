import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { User } from '../entities/user';
import { GetUser } from './get-user';

describe('Get user', () => {
  it('should be able to get a creted user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    const createdUser = new User({
      email: 'first.last@test.com',
      first_name: 'First',
      last_name: 'Last',
      avatar: 'test.jpg',
    });

    await usersRepository.create(createdUser);

    const { user } = await getUser.execute({
      userId: createdUser.id,
    });

    expect(user).toEqual(createdUser);
  });

  it('should not be able to delete the avatar of a non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    expect(() => {
      return getUser.execute({
        userId: 1,
      });
    }).rejects.toThrow(Error);
  });
});
