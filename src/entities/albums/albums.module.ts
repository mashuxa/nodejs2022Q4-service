import { Module } from '@nestjs/common';
import { AlbumController } from './albums.controller';
import { DBModule } from '../../db/db.module';
import { AlbumsService } from './albums.service';
import albumProviders from '../../db/entities/albums/album.providers';

@Module({
  controllers: [AlbumController],
  providers: [...albumProviders, AlbumsService],
  imports: [DBModule],
})
export class AlbumsModule {}
