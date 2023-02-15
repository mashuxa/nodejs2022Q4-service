import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { DBModule } from '../../db/db.module';
import { TracksService } from './tracks.service';
import trackProviders from '../../db/entities/tracks/track.providers';

@Module({
  controllers: [TrackController],
  providers: [...trackProviders, TracksService],
  imports: [DBModule],
})
export class TracksModule {}
