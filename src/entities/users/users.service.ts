import { DB } from '../../db/DB';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import errorMessages from '../../constants/errorMessages';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DB) {}

  async findAll() {
    return this.db.users.findAll();
  }

  async findOne(id: string) {
    return this.db.users.findById(id);
  }

  async create(user: User) {
    return this.db.users.create(user);
  }

  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = this.db.users.findById(id);

    if (!user) return;

    if (user.password !== oldPassword) {
      throw new HttpException(
        errorMessages.incorrectPassword,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.db.users.update(id, new UpdateUserDto(user, newPassword));
  }

  async delete(id: string) {
    const user = this.db.users.findById(id);

    if (!user) return;

    this.db.users.remove(id);

    return '';
  }
}
