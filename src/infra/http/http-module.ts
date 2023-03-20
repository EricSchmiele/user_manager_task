import { Module } from '@nestjs/common';
import { CreateAllUsers } from '../../../src/application/use-cases/create-all-users';
import { CreateUser } from '../../../src/application/use-cases/create-user';
import { DeleteUserAvatar } from '../../../src/application/use-cases/delete-user-avatar';
import { GetUser } from '../../../src/application/use-cases/get-user';
import { GetUserAvatar } from '../../../src/application/use-cases/get-user-avatar';
import { GetUserFromReqRes } from '../../../src/application/use-cases/get-user-from-reqres';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    GetUserFromReqRes,
    GetUser,
    CreateUser,
    CreateAllUsers,
    GetUserAvatar,
    DeleteUserAvatar,
  ],
})
export class HttpModule {}
