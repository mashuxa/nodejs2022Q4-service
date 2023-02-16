import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { DBModule } from '../../db/db.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [DBModule],
})
export class UsersModule {}
