import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entities/users/users.module';
import { TracksModule } from './entities/tracks/tracks.module';
import { ArtistModule } from './entities/artists/artist.module';
import { AlbumsModule } from './entities/albums/albums.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
