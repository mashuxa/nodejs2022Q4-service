import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { DBModule } from '../../db/db.module';

@Module({
  controllers: [UserController],
  imports: [DBModule],
})
export class UsersModule {}
