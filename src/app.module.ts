import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { TracksModule } from './entities/tracks/tracks.module';

@Module({
  imports: [UsersModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
