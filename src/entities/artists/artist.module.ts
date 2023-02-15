import { Module } from '@nestjs/common';
import { ArtistController } from './artists.controller';
import { DBModule } from '../../db/db.module';
import { ArtistsService } from './artists.service';
import artistProviders from '../../db/entities/artists/artist.providers';

@Module({
  controllers: [ArtistController],
  providers: [...artistProviders, ArtistsService],
  imports: [DBModule],
})
export class ArtistModule {}
