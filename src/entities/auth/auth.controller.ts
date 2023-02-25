import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateTokenDto } from './dto/updateToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() credentials: CreateUserDto) {
    return await this.authService.signup(credentials);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() credentials: CreateUserDto) {
    return await this.authService.login(credentials);
  }

  @Post('refresh')
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(@Body() credentials: UpdateTokenDto) {
    return await this.authService.refresh(credentials);
  }
}
