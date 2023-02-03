import { DBEntity } from './DBEntity';
import { Artist } from '../../entities/artists/interface/artist.interface';

export class DBArtists extends DBEntity<Artist> {
  constructor() {
    super();
  }
}
