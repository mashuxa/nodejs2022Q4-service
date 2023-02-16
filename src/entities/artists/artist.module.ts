import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { DBModule } from '../../db/db.module';
import { ArtistService } from './artist.service';
import artistProviders from './artist.providers';

@Module({
  controllers: [ArtistController],
  providers: [...artistProviders, ArtistService],
  imports: [DBModule],
})
export class ArtistModule {}
