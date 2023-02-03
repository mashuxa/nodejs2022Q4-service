import { DBEntity } from './DBEntity';
import { Album } from '../../entities/albums/interface/album.interface';

export class DBAlbums extends DBEntity<Album> {
  constructor() {
    super();
  }
}
