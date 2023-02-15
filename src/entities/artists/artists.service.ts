import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArtistDto } from './dto/artist.dto';
import { ARTIST_REPOSITORY } from '../../db/entities/artists/constants';
import { Artist } from '../../db/entities/artists/artist';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ARTIST_REPOSITORY)
    private repository: Repository<Artist>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async create(artistDto: ArtistDto) {
    const artist = new Artist(artistDto);

    return this.repository.save(artist);
  }

  async update(id: string, updateArtistDto: ArtistDto) {
    const artist = this.repository.findOneBy({ id });

    if (!artist) return;

    await this.repository.update(id, updateArtistDto);

    return this.repository.findOneBy({ id });
  }

  async delete(id: string) {
    const artist = await this.repository.findOneBy({ id });

    if (!artist) return;

    await this.repository.delete(id);

    return '';
  }
}
