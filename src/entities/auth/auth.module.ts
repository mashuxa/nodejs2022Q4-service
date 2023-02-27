import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DBModule } from '../../db/db.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guard/jwt.strategy';
import AuthProvider from './guard/auth.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthProvider],
  imports: [
    DBModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
})
export class AuthModule {}
