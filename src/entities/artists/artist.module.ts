import { Module } from '@nestjs/common';
import { ArtistController } from './artists.controller';
import { DBModule } from '../../db/db.module';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistsService],
  imports: [DBModule],
})
export class ArtistModule {}
