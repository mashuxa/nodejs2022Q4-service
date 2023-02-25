import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import errorMessages from '../../constants/errorMessages';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { USER_REPOSITORY } from './constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findOneByLogin(login: string): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ login });

    if (user) {
      return user;
    }

    throw new HttpException(errorMessages.incorrectAuth, HttpStatus.FORBIDDEN);
  }

  async create(userDto: CreateUserDto) {
    const user = new UserEntity(userDto);

    return this.repository.save(user);
  }

  // @todo: change to hash (when test will be fixed)
  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) return;

    if (user.password !== oldPassword) {
      throw new HttpException(
        errorMessages.incorrectAuth,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.repository.update(id, { password: newPassword });

    return this.repository.findOneBy({ id });
  }

  async updateToken(id: string, refreshToken: string) {
    await this.repository.update(id, { refreshToken });
  }

  async delete(id: string) {
    const user = await this.repository.findOneBy({ id });

    if (!user) return;

    await this.repository.delete(id);

    return '';
  }
}
