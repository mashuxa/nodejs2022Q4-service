import { Module } from '@nestjs/common';
import { ArtistController } from './artists.controller';
import { DBModule } from '../../db/db.module';

@Module({
  controllers: [ArtistController],
  imports: [DBModule],
})
export class ArtistModule {}
