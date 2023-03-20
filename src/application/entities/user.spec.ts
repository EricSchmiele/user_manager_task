import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      email: 'first.last@test.com',
      first_name: 'First',
      last_name: 'Last',
    });

    expect(user).toBeTruthy();
  });
});
