import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AlbumDto } from './dto/album.dto';
import { ALBUM_REPOSITORY } from '../../db/entities/albums/constants';
import { Album } from '../../db/entities/albums/album';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(ALBUM_REPOSITORY)
    private repository: Repository<Album>,
  ) {}

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async create(albumDto: AlbumDto) {
    const album = new Album(albumDto);

    return this.repository.save(album);
  }

  async update(id: string, updateAlbumDto: AlbumDto) {
    const album = await this.repository.findOneBy({ id });

    if (!album) return;

    await this.repository.update(id, updateAlbumDto);

    return this.repository.findOneBy({ id });
  }

  async delete(id: string) {
    const album = await this.repository.findOneBy({ id });

    if (!album) return;

    await this.repository.delete(id);

    return '';
  }
}
