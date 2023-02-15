import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import errorMessages from '../../constants/errorMessages';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../db/entities/users/user';
import { USER_REPOSITORY } from '../../db/entities/users/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: Repository<User>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async create(user: CreateUserDto) {
    return this.repository.create(user);
  }

  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) return;

    if (user.password !== oldPassword) {
      throw new HttpException(
        errorMessages.incorrectPassword,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.repository.update(id, { ...user, password: newPassword });
  }

  async delete(id: string) {
    const user = this.repository.findOneBy({ id });

    if (!user) return;

    await this.repository.delete(id);

    return '';
  }
}
