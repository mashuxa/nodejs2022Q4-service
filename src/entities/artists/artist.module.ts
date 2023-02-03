import { Module } from '@nestjs/common';
import { ArtistController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistsService],
})
export class ArtistModule {}
