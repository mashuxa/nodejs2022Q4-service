import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteArtistFromFavorites(id);
  }
}
