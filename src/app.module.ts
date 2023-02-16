import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './entities/user/user.module';
import { TrackModule } from './entities/track/track.module';
import { ArtistModule } from './entities/artists/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { FavoritesModule } from './entities/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
