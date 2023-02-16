import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { DBModule } from '../../db/db.module';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DBModule],
})
export class FavoritesModule {}
