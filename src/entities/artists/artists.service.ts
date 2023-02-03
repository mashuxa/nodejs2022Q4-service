import { Injectable } from '@nestjs/common';
import { Artist } from './interface/artist.interface';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist | undefined {
    return this.artists.find((artists) => artists.id === id);
  }

  create(artists: Artist): Artist {
    this.artists.push(artists);

    return artists;
  }

  update(id: string, artists: Omit<Artist, 'id'>): Artist {
    const artistsIndex = this.artists.findIndex((value) => value.id === id);

    this.artists[artistsIndex] = { id, ...artists };

    return this.artists[artistsIndex];
  }

  remove(id: string): void {
    this.artists = this.artists.filter((artists) => artists.id !== id);
  }
}
