import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAllUsers } from '../../../../src/application/use-cases/create-all-users';
import { CreateUser } from '../../../../src/application/use-cases/create-user';
import { DeleteUserAvatar } from '../../../../src/application/use-cases/delete-user-avatar';
import { GetUser } from '../../../../src/application/use-cases/get-user';
import { GetUserAvatar } from '../../../../src/application/use-cases/get-user-avatar';
import { GetUserFromReqRes } from '../../../../src/application/use-cases/get-user-from-reqres';
import { UserViewModel } from '../view-modules/user-view-model';

@Controller('api')
export class UsersController {
  constructor(
    private getUserFromReqRes: GetUserFromReqRes,
    private getUser: GetUser,
    private createUser: CreateUser,
    private createAllUsers: CreateAllUsers,
    private getUserAvatar: GetUserAvatar,
    private deleteUserAvatar: DeleteUserAvatar,
  ) {}

  @Get('user/hello')
  async getHello() {
    return 'Hello!!';
  }

  @Get('user/:id')
  async getFromReqRes(@Param('id') id: number) {
    const { user } = await this.getUserFromReqRes.execute({
      userId: id,
      url: 'https://reqres.in/api/users',
    });

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  }

  @Get('user/:id/fromdb')
  async get(@Param('id') id: number) {
    const { user } = await this.getUser.execute({ userId: id });

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  }

  @Post('users')
  async create(@Body() body: any) {
    const { email, first_name, last_name, avatar } = body;

    const { user } = await this.createUser.execute({
      email,
      first_name,
      last_name,
      avatar,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Post('users/addall')
  async createAll() {
    await this.createAllUsers.execute({
      url: 'https://reqres.in/api/users',
      pages: 2,
    });
  }

  @Get('user/:id/avatar')
  async getAvatar(@Param('id') id: number) {
    const { avatar } = await this.getUserAvatar.execute({ userId: id });

    return { avatar };
  }

  @Delete('user/:id/avatar')
  async deleteAvatar(@Param('id') id: number) {
    await this.deleteUserAvatar.execute({ userId: id });
  }
}
