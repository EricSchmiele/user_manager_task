import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import axios from 'axios';

interface CreateAllUsersRequest {
  url: string;
  pages: number;
}

type CreateAllUsersResponse = void;

@Injectable()
export class CreateAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: CreateAllUsersRequest,
  ): Promise<CreateAllUsersResponse> {
    const { url, pages } = request;

    for (let page = 1; page <= pages; page++) {
      const reponse = await axios.get(url + '?page=' + page.toString(), {});
      reponse.data.data.forEach(
        async (user) =>
          await this.usersRepository.create(
            new User(
              {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
              },
              user.id,
            ),
          ),
      );
    }
  }
}
