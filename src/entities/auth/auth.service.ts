import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import errorMessages from '../../constants/errorMessages';
import { UserService } from '../user/user.service';
import { UpdateTokenDto } from './dto/updateToken.dto';
import { Payload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateToken(
    { login, id }: UserEntity,
    secret: string,
    expiresIn: string,
  ) {
    const payload = { login, userId: id };

    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  async generateTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(
        user,
        process.env.JWT_SECRET_KEY,
        process.env.TOKEN_EXPIRE_TIME,
      ),
      this.generateToken(
        user,
        process.env.JWT_SECRET_REFRESH_KEY,
        process.env.TOKEN_REFRESH_EXPIRE_TIME,
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async generateHash(password: string) {
    return bcrypt.hashSync(password, Number(process.env.CRYPT_SALT));
  }

  async validatePassword(user: UserEntity, password: string) {
    if (!bcrypt.compare(password, user.password)) {
      throw new HttpException(
        errorMessages.incorrectAuth,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<UserEntity> {
    const isValidToken = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      })
      .catch(() => false);

    if (!isValidToken) {
      throw new HttpException(errorMessages.forbidden, HttpStatus.FORBIDDEN);
    }

    const payload = this.jwtService.decode(refreshToken) as Payload;
    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    if (refreshToken !== user.refreshToken) {
      throw new HttpException(errorMessages.forbidden, HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async signup({ login, password }: CreateUserDto) {
    const hashedPassword = await this.generateHash(password);

    return this.userService.create({ login, password: hashedPassword });
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.userService.findOneByLogin(login);

    await this.validatePassword(user, password);

    const { accessToken, refreshToken } = await this.generateTokens(user);

    await this.userService.updateToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh({ refreshToken: token }: UpdateTokenDto) {
    const user = await this.verifyRefreshToken(token);

    const { accessToken, refreshToken } = await this.generateTokens(user);

    await this.userService.updateToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }
}
