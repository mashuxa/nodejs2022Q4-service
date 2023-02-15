import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interface/track.interface';
import { TRACK_REPOSITORY } from '../../db/entities/tracks/constants';

@Injectable()
export class TracksService {
  constructor(
    @Inject(TRACK_REPOSITORY)
    private repository: Repository<Track>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async create(track: Track) {
    return this.repository.create(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.repository.findOneBy({ id });

    if (!track) return;

    return this.repository.update(id, updateTrackDto);
  }

  async delete(id: string) {
    const track = this.repository.findOneBy({ id });

    if (!track) return;

    await this.repository.delete(id);
    // this.db.favorites.tracks.remove(id);

    return '';
  }
}
