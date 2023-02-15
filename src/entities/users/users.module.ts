import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { DBModule } from '../../db/db.module';
import { UsersService } from './users.service';
import userProviders from '../../db/entities/users/user.provider';

@Module({
  controllers: [UserController],
  providers: [...userProviders, UsersService],
  imports: [DBModule],
})
export class UsersModule {}
