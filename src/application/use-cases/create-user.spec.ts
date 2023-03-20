import { InMemoryUsersRepository } from '../../../test/repositories/in-memory-users-repository';
import { CreateUser } from './create-user';

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      email: 'first.last@test.com',
      first_name: 'First',
      last_name: 'Last',
      avatar: 'avatar.jpg',
    });

    expect(usersRepository.users).toHaveLength(1);
  });
});
