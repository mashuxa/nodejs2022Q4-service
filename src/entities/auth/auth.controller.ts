import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(@Body() credentials: CreateUserDto) {
    return await this.authService.refresh(credentials);
  }
}
