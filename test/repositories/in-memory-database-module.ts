import { Module } from '@nestjs/common';
import { PrismaService } from '../../src/infra/database/prisma/prisma.service';
import { UsersRepository } from '../../src/application/repositories/users-repository';
import { InMemoryUsersRepository } from './in-memory-users-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: InMemoryUsersRepository },
  ],
  exports: [UsersRepository],
})
export class InMemoryDatabaseModule {}
