import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import errorMessages from '../../constants/errorMessages';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateHash(password: string) {
    return bcrypt.hashSync(password, Number(process.env.CRYPT_SALT));
  }
  async validatePassword(user: UserEntity, password: string) {
    if (!bcrypt.compare(password, user.password)) {
      throw new HttpException(
        errorMessages.incorrectPassword,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async signup({ login, password }: CreateUserDto) {
    const hashedPassword = await this.generateHash(password);

    return this.userService.create({ login, password: hashedPassword });
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.userService.findOneByLogin(login);

    await this.validatePassword(user, password);

    const payload = { login, userId: user.id };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async refresh({ login, password }: CreateUserDto) {
    // return this.repository.find();
  }
}
