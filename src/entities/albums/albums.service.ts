import { DB } from '../../db/DB';
import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interface/album.interface';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: DB) {}

  async findAll() {
    return this.db.albums.findAll();
  }

  async findOne(id: string) {
    return this.db.albums.findById(id);
  }

  async create(album: Album) {
    return this.db.albums.create(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.findById(id);

    if (!album) return;

    return this.db.albums.update(id, updateAlbumDto);
  }

  async delete(id: string) {
    const album = this.db.albums.findById(id);

    if (!album) return;

    this.db.albums.remove(id);

    const updatedTracks = this.db.tracks
      .findMany('albumId', id)
      .map((track) => ({ ...track, albumId: null }));

    this.db.tracks.updateMany(updatedTracks);
    this.db.favorites.albums.remove(id);

    return '';
  }
}
