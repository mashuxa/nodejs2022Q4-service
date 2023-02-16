import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './favorites.entity';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artists/artist.entity';
import { FAVORITES_REPOSITORY } from './constants';
import { TRACK_REPOSITORY } from '../track/constants';
import { ALBUM_REPOSITORY } from '../album/constants';
import { ARTIST_REPOSITORY } from '../artists/constants';
import errorMessages from '../../constants/errorMessages';

interface Relations {
  tracks?: boolean;
  albums?: boolean;
  artists?: boolean;
}

const defaultRelations: Relations = {
  tracks: true,
  albums: true,
  artists: true,
};

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FAVORITES_REPOSITORY)
    private favoritesRepository: Repository<FavoritesEntity>,

    @Inject(TRACK_REPOSITORY)
    private trackRepository: Repository<TrackEntity>,

    @Inject(ALBUM_REPOSITORY)
    private albumRepository: Repository<AlbumEntity>,

    @Inject(ARTIST_REPOSITORY)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async create() {
    const favorites = new FavoritesEntity();

    return this.favoritesRepository.save(favorites);
  }

  async findByRelations(relations = defaultRelations) {
    const favorites = await this.favoritesRepository.find({ relations });

    if (!favorites.length) {
      await this.create();

      return (await this.favoritesRepository.find({ relations }))[0];
    }

    return favorites[0];
  }

  async findAll() {
    const { artists, albums, tracks } = await this.findByRelations();

    return { artists, albums, tracks };
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.trackRepository.findOneBy({ id: trackId });

    if (!track) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByRelations({ tracks: true });

    favorites.tracks.push(track);

    return await this.favoritesRepository.save(favorites);
  }

  async deleteTrackFromFavorites(trackId: string) {
    const track = await this.trackRepository.findOneBy({ id: trackId });

    if (!track) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    const favorites = await this.findByRelations({ tracks: true });

    favorites.tracks = favorites.tracks.filter((value) => value.id !== trackId);

    return this.favoritesRepository.save(favorites);
  }

  async addAlbumToFavorites(albumId: string) {
    const album = await this.albumRepository.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByRelations({ albums: true });

    favorites.albums.push(album);

    return this.favoritesRepository.save(favorites);
  }

  async deleteAlbumFromFavorites(albumId: string) {
    const album = await this.albumRepository.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    const favorites = await this.findByRelations({ albums: true });

    favorites.albums = favorites.albums.filter((value) => value.id !== albumId);

    return this.favoritesRepository.save(favorites);
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.artistRepository.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        errorMessages.nonExistentEntity,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.findByRelations({ artists: true });

    favorites.artists.push(artist);

    return this.favoritesRepository.save(favorites);
  }

  async deleteArtistFromFavorites(artistId: string) {
    const artist = await this.artistRepository.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(errorMessages.notFound, HttpStatus.NOT_FOUND);
    }

    const favorites = await this.findByRelations({ artists: true });

    favorites.artists = favorites.artists.filter(
      (value) => value.id !== artistId,
    );

    return this.favoritesRepository.save(favorites);
  }
}
