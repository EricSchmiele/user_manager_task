import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import * as fs from 'fs';

interface DeleteUserAvatarRequest {
  userId: number;
}

type DeleteUserAvatarResponse = void;

@Injectable()
export class DeleteUserAvatar {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: DeleteUserAvatarRequest,
  ): Promise<DeleteUserAvatarResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const isExists = fs.existsSync(user.avatar);
    if (isExists) {
      fs.unlinkSync(user.avatar);
    }

    await this.usersRepository.delete(userId);
  }
}
