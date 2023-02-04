import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { DBModule } from '../../db/db.module';

@Module({
  controllers: [FavoritesController],
  imports: [DBModule],
})
export class FavoritesModule {}
