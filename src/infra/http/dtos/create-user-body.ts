import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  avatar: string;
}
