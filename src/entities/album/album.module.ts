import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DBModule } from '../../db/db.module';
import { AlbumService } from './album.service';
import albumProviders from './album.providers';
import artistProviders from '../artists/artist.providers';

@Module({
  controllers: [AlbumController],
  providers: [...albumProviders, ...artistProviders, AlbumService],
  imports: [DBModule],
})
export class AlbumModule {}
