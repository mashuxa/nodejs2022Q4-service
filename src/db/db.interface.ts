import { User } from '../entities/users/interface/user.interface';
import { Track } from '../entities/tracks/interface/track.interface';
import { Artist } from '../entities/artists/interface/artist.interface';
import { Album } from '../entities/albums/interface/album.interface';
import { DBEntity } from './entities/DBEntity';

export interface DBInterface {
  users: DBEntity<User>;
  tracks: DBEntity<Track>;
  artists: DBEntity<Artist>;
  albums: DBEntity<Album>;
}
