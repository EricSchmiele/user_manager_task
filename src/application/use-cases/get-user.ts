import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface GetUserRequest {
  userId: number;
}

interface GetUserResponse {
  user: User;
}

@Injectable()
export class GetUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
}
