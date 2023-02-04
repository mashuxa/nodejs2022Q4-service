import { Module } from '@nestjs/common';
import { AlbumController } from './albums.controller';
import { DBModule } from '../../db/db.module';

@Module({
  controllers: [AlbumController],
  imports: [DBModule],
})
export class AlbumsModule {}
