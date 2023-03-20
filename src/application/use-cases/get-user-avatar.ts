import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import * as fs from 'fs';
import axios from 'axios';
import * as crypto from 'crypto';
import { resolve } from 'path';

interface GetUserAvatarRequest {
  userId: number;
}

interface GetUserAvatarResponse {
  avatar: string;
}

@Injectable()
export class GetUserAvatar {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetUserAvatarRequest): Promise<GetUserAvatarResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let fileName = user.avatar;

    const isExists = fs.existsSync(fileName);
    if (isExists) {
      const image = fs.readFileSync(fileName);
      const imageBffer = Buffer.from(image);
      return { avatar: imageBffer.toString('base64') };
    } else {
      const result = await axios.request({
        responseType: 'arraybuffer',
        url: user.avatar,
        method: 'get',
        headers: {},
      });
      const filepath = resolve(__dirname, '..', '..', '..', 'avatars');
      fileName =
        filepath +
        '/' +
        userId.toString() +
        crypto.randomBytes(16).toString('hex') +
        '.jpg';
      fs.writeFileSync(fileName, result.data);
      user.avatar = fileName;
      await this.usersRepository.update(user);
      return { avatar: Buffer.from(result.data).toString('base64') };
    }
  }
}
