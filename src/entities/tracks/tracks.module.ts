import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { DBModule } from '../../db/db.module';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TrackController],
  providers: [TracksService],
  imports: [DBModule],
})
export class TracksModule {}
