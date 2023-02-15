import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { DBModule } from '../../db/db.module';
import { TracksService } from './tracks.service';
import trackProviders from '../../db/entities/tracks/track.providers';
import albumProviders from '../../db/entities/albums/album.providers';
import artistProviders from '../../db/entities/artists/artist.providers';

@Module({
  controllers: [TrackController],
  providers: [
    ...trackProviders,
    ...albumProviders,
    ...artistProviders,
    TracksService,
  ],
  imports: [DBModule],
})
export class TracksModule {}
