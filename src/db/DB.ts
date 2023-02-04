import { DBInterface } from './db.interface';
import { DBEntity } from './entities/DBEntity';
import { User } from '../entities/users/interface/user.interface';
import { Track } from '../entities/tracks/interface/track.interface';
import { Album } from '../entities/albums/interface/album.interface';
import { Artist } from '../entities/artists/interface/artist.interface';
import { Injectable } from '@nestjs/common';
import { DBFavorites } from './entities/DBFavorites';

@Injectable()
export class DB implements DBInterface {
  users = new DBEntity<User>();
  tracks = new DBEntity<Track>();
  albums = new DBEntity<Album>();
  artists = new DBEntity<Artist>();
  favorites = {
    tracks: new DBFavorites(),
    albums: new DBFavorites(),
    artists: new DBFavorites(),
  };
}
