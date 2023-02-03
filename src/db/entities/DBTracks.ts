import { DBEntity } from './DBEntity';
import { Track } from '../../entities/tracks/interface/track.interface';

export class DBTracks extends DBEntity<Track> {
  constructor() {
    super();
  }
}
