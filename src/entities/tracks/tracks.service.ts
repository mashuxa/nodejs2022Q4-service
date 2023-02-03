import { Injectable } from '@nestjs/common';
import { Track } from './interface/track.interface';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  create(track: Track): Track {
    this.tracks.push(track);

    return track;
  }

  update(id: string, track: Omit<Track, 'id'>): Track {
    const trackIndex = this.tracks.findIndex((value) => value.id === id);

    this.tracks[trackIndex] = { id, ...track };

    return this.tracks[trackIndex];
  }

  remove(id: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
