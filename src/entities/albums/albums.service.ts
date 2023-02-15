import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ALBUM_REPOSITORY } from '../../db/entities/albums/constants';
import { TRACK_REPOSITORY } from '../../db/entities/tracks/constants';
import { Album } from '../../db/entities/albums/album';
import { Track } from '../../db/entities/tracks/track';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(ALBUM_REPOSITORY)
    private albumRepository: Repository<Album>,
    @Inject(TRACK_REPOSITORY)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async create(album: Album) {
    return this.albumRepository.create(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumRepository.findOneBy({ id });

    if (!album) return;

    return this.albumRepository.update(id, updateAlbumDto);
  }

  async delete(id: string) {
    const album = this.albumRepository.findOneBy({ id });

    if (!album) return;

    await this.albumRepository.delete(id);

    this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set({ albumId: null })
      .where({ albumId: id });

    // this.db.favorites.albums.remove(id);

    return '';
  }
}
