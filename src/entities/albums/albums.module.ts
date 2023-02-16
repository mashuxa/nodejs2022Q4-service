import { Module } from '@nestjs/common';
import { AlbumController } from './albums.controller';
import { DBModule } from '../../db/db.module';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumsService],
  imports: [DBModule],
})
export class AlbumsModule {}
