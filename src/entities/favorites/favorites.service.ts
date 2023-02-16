import { DB } from '../../db/DB';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import errorMessages from '../../constants/errorMessages';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DB) {}

  async findAll() {
    const tracksIds = this.db.favorites.tracks.findAll();
    const albumsIds = this.db.favorites.albums.findAll();
    const artistsIds = this.db.favorites.artists.findAll();
    const tracks = this.db.tracks.findMany('id', tracksIds);
    const albums = this.db.albums.findMany('id', albumsIds);
    const artists = this.db.artists.findMany('id', artistsIds);

    return { tracks, albums, artists };
  }

  async addTrackToFavorites(id: string) {
    const entity = this.db.tracks.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.tracks.create(id);
  }

  async deleteTrackFromFavorites(id: string) {
    if (!this.db.favorites.tracks.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.tracks.remove(id);

    return '';
  }

  async addAlbumToFavorites(id: string) {
    const entity = this.db.albums.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.albums.create(id);
  }

  async deleteAlbumFromFavorites(id: string) {
    if (!this.db.favorites.albums.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.albums.remove(id);

    return '';
  }

  async addArtistToFavorites(id: string) {
    const entity = this.db.artists.findById(id);

    if (!entity) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.artists.create(id);
  }

  async deleteArtistFromFavorites(id: string) {
    if (!this.db.favorites.artists.findById(id)) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    this.db.favorites.artists.remove(id);

    return '';
  }
}
