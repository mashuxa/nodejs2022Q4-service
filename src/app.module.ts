import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { TracksModule } from './entities/tracks/tracks.module';
import { ArtistModule } from './entities/artists/artist.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
