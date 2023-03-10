import { Exclude } from 'class-transformer';
import { User } from '../interface/user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto implements Omit<User, 'id'> {
  @IsNotEmpty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  login: string;
  createdAt: number;
  updatedAt: number;
  version: number;

  constructor(user: UpdateUserDto, newPassword: string) {
    Object.assign(this, user);

    this.updatedAt = Date.now();
    this.version = ++this.version;
    this.password = newPassword;
  }
}
