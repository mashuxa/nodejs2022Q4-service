import { Module } from '@nestjs/common';
import { TrackController } from './tracks.controller';
import { DBModule } from '../../db/db.module';

@Module({
  controllers: [TrackController],
  imports: [DBModule],
})
export class TracksModule {}
