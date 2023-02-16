import { v4 as uuid } from 'uuid';
import { UpdateAlbumDto } from './update-album.dto';
import { Album } from '../interface/album.interface';

export class CreateAlbumDto extends UpdateAlbumDto implements Album {
  id: string;

  constructor(artist: Partial<CreateAlbumDto>) {
    super(artist);

    this.id = uuid();
  }
}
