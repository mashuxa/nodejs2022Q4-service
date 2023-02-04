import { DB } from '../../db/DB';
import { Injectable } from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interface/track.interface';

@Injectable()
export class TracksService {
  constructor(private readonly db: DB) {}

  async findAll() {
    return this.db.tracks.findAll();
  }

  async findOne(id: string) {
    return this.db.tracks.findById(id);
  }

  async create(track: Track) {
    return this.db.tracks.create(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.findById(id);

    if (!track) return;

    return this.db.tracks.update(id, updateTrackDto);
  }

  async delete(id: string) {
    const track = this.db.tracks.findById(id);

    if (!track) return;

    this.db.tracks.remove(id);
    this.db.favorites.tracks.remove(id);

    return '';
  }
}
