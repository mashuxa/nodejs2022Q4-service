import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTIST_REPOSITORY } from '../../db/entities/artists/constants';
import { TRACK_REPOSITORY } from '../../db/entities/tracks/constants';
import { ALBUM_REPOSITORY } from '../../db/entities/albums/constants';
import { Track } from '../../db/entities/tracks/track';
import { Artist } from '../../db/entities/artists/artist';
import { Album } from '../../db/entities/albums/album';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ARTIST_REPOSITORY)
    private artistRepository: Repository<Artist>,
    @Inject(TRACK_REPOSITORY)
    private trackRepository: Repository<Track>,
    @Inject(ALBUM_REPOSITORY)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async create(artist: CreateArtistDto) {
    return this.artistRepository.create(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistRepository.findOneBy({ id });

    if (!artist) return;

    return this.artistRepository.update(id, updateArtistDto);
  }

  async delete(id: string) {
    const artist = this.artistRepository.findOneBy({ id });

    if (!artist) return;

    await this.artistRepository.delete(id);

    this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set({ artistId: null })
      .where({ artistId: id });
    this.albumRepository
      .createQueryBuilder()
      .update(Album)
      .set({ artistId: null })
      .where({ artistId: id });

    // this.db.favorites.artists.remove(id);

    return '';
  }
}
