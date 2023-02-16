import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../interface/user.interface';
import { v4 as uuid } from 'uuid';

export class CreateUserDto implements User {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;

  id: string;
  createdAt: number;
  updatedAt: number;
  version: number;

  constructor(user: Partial<CreateUserDto>) {
    Object.assign(this, user);

    this.id = uuid();
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
    this.version = 1;
  }
}
