import { Injectable } from '@nestjs/common';
import { User } from '../../../../../src/application/entities/user';
import { UsersRepository } from 'src/application/repositories/users-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  async findById(userId: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: +userId,
      },
    });

    if (!user) {
      return null;
    }

    return new User(
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
      user.id,
    );
  }

  async update(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: {
        id: raw.id,
      },
      data: {
        email: raw.email,
        first_name: raw.first_name,
        last_name: raw.last_name,
        avatar: raw.avatar,
      },
    });
  }

  async countMany(): Promise<number> {
    const count = await this.prismaService.user.count();
    return count;
  }

  async delete(userId: number): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: +userId,
      },
    });
  }
}
