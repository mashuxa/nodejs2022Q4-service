import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DBModule } from '../../db/db.module';
import { UserService } from './user.service';
import userProviders from './user.provider';

@Module({
  controllers: [UserController],
  providers: [...userProviders, UserService],
  imports: [DBModule],
})
export class UserModule {}
