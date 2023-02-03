import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TrackController],
  providers: [TracksService],
})
export class TracksModule {}
