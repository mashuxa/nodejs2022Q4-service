import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TrackDto } from './dto/track.dto';
import { TRACK_REPOSITORY } from '../../db/entities/tracks/constants';
import { Track } from '../../db/entities/tracks/track';

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

  async create(trackDto: TrackDto) {
    const track = new Track(trackDto);

    return this.repository.save(track);
  }

  async update(id: string, updateTrackDto: TrackDto) {
    const track = await this.repository.findOneBy({ id });

    if (!track) return;

    await this.repository.update(id, updateTrackDto);

    return this.repository.findOneBy({ id });
  }

  async delete(id: string) {
    const track = await this.repository.findOneBy({ id });

    if (!track) return;

    await this.repository.delete(id);

    return '';
  }
}
