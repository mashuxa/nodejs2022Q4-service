import { Module } from '@nestjs/common';
import { AlbumController } from './albums.controller';
import { DBModule } from '../../db/db.module';
import { AlbumsService } from './albums.service';
import albumProviders from '../../db/entities/albums/album.providers';
import artistProviders from '../../db/entities/artists/artist.providers';

@Module({
  controllers: [AlbumController],
  providers: [...albumProviders, ...artistProviders, AlbumsService],
  imports: [DBModule],
})
export class AlbumsModule {}
