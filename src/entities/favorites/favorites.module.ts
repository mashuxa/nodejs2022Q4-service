import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { DBModule } from '../../db/db.module';
import { FavoritesService } from './favorites.service';
import favoritesProviders from './favorites.providers';
import albumProviders from '../album/album.providers';
import artistProviders from '../artists/artist.providers';
import trackProviders from '../track/track.providers';

@Module({
  controllers: [FavoritesController],
  providers: [
    ...favoritesProviders,
    ...albumProviders,
    ...artistProviders,
    ...trackProviders,
    FavoritesService,
  ],
  imports: [DBModule],
})
export class FavoritesModule {}
