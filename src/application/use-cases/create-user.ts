import { Injectable } from '@nestjs/common';
import { RabbitmqService } from '../../../src/infra/rabbitmq/rabbitmq-service';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';

interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, first_name, last_name, avatar } = request;

    const id = randomInt(500) + 12;

    const user = new User(
      {
        email,
        first_name,
        last_name,
        avatar,
      },
      id,
    );

    await this.usersRepository.create(user);

    //send email
    const userEmail = 'eric.robotic@gmail.com';
    const pass = 'notRealPassword';
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: userEmail, pass },
      tls: { rejectUnauthorized: false },
    });

    //send email
    // await transporter.sendMail({
    //   from: userEmail,
    //   to: user.email,
    //   subject: 'You have been inserted as user',
    //   text: 'Thank you for being part of our platform.',
    // });

    //rabbitmq event
    const rabbitmqService = new RabbitmqService(
      'amqp://admin:admin@localhost:5672',
    );
    // await rabbitmqService.start();
    // await rabbitmqService.publishInQueue('users', JSON.stringify(user));

    return {
      user,
    };
  }
}
