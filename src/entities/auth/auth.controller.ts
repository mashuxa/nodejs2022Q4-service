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
import { UpdateTokenDto } from './dto/updateToken.dto';
import { Public } from './decorators/Public.decorator';
import { JwtRefreshAuthGuard } from './guard/refresh/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() credentials: CreateUserDto) {
    return await this.authService.signup(credentials);
  }

  @Public()
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() credentials: CreateUserDto) {
    return await this.authService.login(credentials);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @UseInterceptors(ClassSerializerInterceptor)
  async refresh(@Body() credentials: UpdateTokenDto) {
    return await this.authService.refresh(credentials);
  }
}
