import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { DB } from '../../db/DB';
import errorMessages from '../../constants/errorMessages';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly db: DB) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const tracksIds = this.db.favorites.tracks.findAll();
    const albumsIds = this.db.favorites.albums.findAll();
    const artistsIds = this.db.favorites.artists.findAll();
    const tracks = this.db.tracks.findMany('id', tracksIds);
    const albums = this.db.albums.findMany('id', albumsIds);
    const artists = this.db.artists.findMany('id', artistsIds);

    return { tracks, albums, artists };
  }

  @Post('track/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.db.tracks.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.tracks.create(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.db.favorites.tracks.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.tracks.remove(id);

    return '';
  }

  @Post('album/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.db.albums.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.albums.create(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.db.favorites.albums.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.albums.remove(id);

    return '';
  }

  @Post('artist/:id')
  @UseInterceptors(NotFoundInterceptor)
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    const entity = this.db.artists.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.artists.create(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async deleteArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    if (!this.db.favorites.artists.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.artists.remove(id);

    return '';
  }
}
