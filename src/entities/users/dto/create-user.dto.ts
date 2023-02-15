import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../interface/user.interface';

type CreateUserDtoType = Pick<User, 'login' | 'password'>;

export class CreateUserDto implements CreateUserDtoType {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  constructor({ password, login }: CreateUserDtoType) {
    this.login = login;
    this.password = password;
  }
}
