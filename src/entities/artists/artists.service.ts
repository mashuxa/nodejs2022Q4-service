import { DB } from '../../db/DB';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DB) {}

  async findAll() {
    return this.db.artists.findAll();
  }

  async findOne(id: string) {
    return this.db.artists.findById(id);
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.db.artists.create(new CreateArtistDto(createArtistDto));
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.findById(id);

    if (!artist) return;

    return this.db.artists.update(id, updateArtistDto);
  }

  async delete(id: string) {
    const artist = this.db.artists.findById(id);

    if (!artist) return;

    this.db.artists.remove(id);

    const updatedTracks = this.db.tracks
      .findMany('artistId', id)
      .map((track) => ({ ...track, artistId: null }));
    const updatedAlbums = this.db.albums
      .findMany('artistId', id)
      .map((artist) => ({ ...artist, artistId: null }));

    this.db.tracks.updateMany(updatedTracks);
    this.db.albums.updateMany(updatedAlbums);
    this.db.favorites.artists.remove(id);

    return '';
  }
}
