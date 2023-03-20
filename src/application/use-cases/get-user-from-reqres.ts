import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import axios from 'axios';

interface GetUserFromReqResRequest {
  userId: number;
  url: string;
}

interface GetUserFromReqResResponse {
  user: User;
}

@Injectable()
export class GetUserFromReqRes {
  async execute(
    request: GetUserFromReqResRequest,
  ): Promise<GetUserFromReqResResponse> {
    const { userId, url } = request;

    const response = await axios.get(url + '/' + userId.toString(), {});

    if (!response.data.data) {
      throw new Error('User not found');
    }

    const returnUser = new User(
      {
        email: response.data.data.email,
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        avatar: response.data.data.avatar,
      },
      response.data.data.id,
    );

    return { user: returnUser };
  }
}
