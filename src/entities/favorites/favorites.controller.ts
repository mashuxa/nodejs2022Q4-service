import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteArtistFromFavorites(id);
  }
}
