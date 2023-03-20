import { GetUserFromReqRes } from './get-user-from-reqres';

describe('Get user', () => {
  it('should be able to get a user from reqres', async () => {
    const getUserFromReqRes = new GetUserFromReqRes();

    const { user } = await getUserFromReqRes.execute({
      userId: 2,
      url: 'https://reqres.in/api/users',
    });

    expect(user.id).toEqual(2);
  });

  it('should not be able to find a user from the wrong url', async () => {
    const getUserFromReqRes = new GetUserFromReqRes();

    expect(() => {
      return getUserFromReqRes.execute({
        userId: 2,
        url: 'https://wrong.url/api/users',
      });
    }).rejects.toThrow(Error);
  });

  it('should not be able to find a non-existing user', async () => {
    const getUserFromReqRes = new GetUserFromReqRes();

    expect(() => {
      return getUserFromReqRes.execute({
        userId: 14,
        url: 'https://reqres.in/api/users',
      });
    }).rejects.toThrow(Error);
  });
});
