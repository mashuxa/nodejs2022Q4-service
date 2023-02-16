import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { DBModule } from '../../db/db.module';
import { TrackService } from './track.service';
import trackProviders from './track.providers';
import albumProviders from '../album/album.providers';
import artistProviders from '../artists/artist.providers';

@Module({
  controllers: [TrackController],
  providers: [
    ...trackProviders,
    ...albumProviders,
    ...artistProviders,
    TrackService,
  ],
  imports: [DBModule],
})
export class TrackModule {}
